from flask import Blueprint, request, make_response, render_template
from pymongo.errors import OperationFailure
from pymongo import ReturnDocument
from werkzeug.security import generate_password_hash, check_password_hash
import json
from datetime import datetime
from bson import ObjectId
from python_http_client.exceptions import HTTPError

from db import db
from utils.jwt_utils import encode_auth_token, is_valid_jwt, is_valid_jwt_no_request
from utils.response_utils import string_response, INVALID_TOKEN_MESSAGE, NO_EMAIL_MESSAGE, SERVER_ERROR, JSON_MIME_TYPE, NO_PASSWORD_MESSAGE
from email_client import sg
from utils.email_utils import send_verification_email, send_forgot_password_email

auth = Blueprint('auth', __name__)

@auth.route('/users/register', methods=["POST"])
def create_user():
    """Creates a user within the database

    Checks to see if email exists in database and then hashes the provided password.
    Takes the user's email and hashed password adds them to a new database record.
    A separate record is created to store the user's data and preferences

    Request:
        Body:
            email: user's email as a string
            password: user's password as a string

    Returns:
        A Response object
        - if no email:
            status_code = 400,
            data = "Email must be provided"

        - if no password
            status_code = 400,
            data = "Password must be provided"

        - if email already exists in the database
            status_code = 409,
            data = "Email already exists"

        - if there is an error accessing database
            status_code = 500,
            data = "Cannot complete request"

        - if success
            status_code = 200,
            data = {
                _id: the user's id as a string
                token: the user's JWT as a string
                stats: a string array of the user's stats
                teams: a string array of the user's teams
                email: the user's email
            }
    
    """

    # get email and password from request
    email = request.get_json()["email"]
    password = request.get_json()["password"]

    if (not email):
        return string_response(NO_EMAIL_MESSAGE, 400)
    elif (not password):
        return string_response(NO_PASSWORD_MESSAGE, 400)

    # Check if email already exists in database
    if (db.users.find_one({ "email": email})):
        return string_response("Email already exists", 409)
    
    # hash the password
    user = None
    hashed_password=generate_password_hash(password, method='sha256')

    try: 
        # create document in users collection for auth data
        insert_user_obj = db.users.insert_one(
            { 
                "email": email,
                "password": hashed_password,
                "emailVerified": False,
            }
        );

        user_id = str(insert_user_obj.inserted_id)
        user = {
            "_id": user_id,
            "email": email,
            "stats": [],
            "teams": []
        }

        # create document in user_preferences for other user data
        db.user_preferences.insert_one(user)

    except OperationFailure:
        # return error if database cannot be accessed
        return string_response(SERVER_ERROR, 500)
    
    try:
        send_verification_email(email, user_id)
    except HTTPError as e:
        print(e.to_dict)

    user["token"] = encode_auth_token(user_id) # add jwt token to user
    user["emailVerified"] = False

    #create response with user record (PASSWORD is not sent back to client)
    response = make_response()
    response.status_code = 200
    response.response = json.dumps(user)
    response.mimetype = JSON_MIME_TYPE

    return response

@auth.route('/users/login', methods=["POST"])
def login_user():
    """Logs in an existing user

    Checks if email is in database and if the submitted password hash matches the hash in the database.
    Gets the user's preferences from the db and returns them to the client

    Request:
        Body:
            email: user's email as a string
            password: user's password as a string


    Returns:
        A response object

        - if no email:
            status_code: 400,
            data: "Email must be provided"

        - if no password:
            status_code: 400,
            data: "Password must be provided"

        - if no user record in database or password hashes do not match:
            status_code: 400,
            data: "Email or password is incorrect"

        - if database cannot be accessed:
            status_code: 500,
            data: "Cannot complete request"

        - if success:
            status_code: 200,
            data: {
                _id: the user's id as a string
                email: the user's email
                token: the user's JWT as a string
                stats: a string array of the ids of the stats the user follows
                teams: a string array of the ids of the teams the user follows
            }
    
    """
    email = request.get_json()["email"]
    password = request.get_json()["password"]

    if (not email):
        return string_response(NO_EMAIL_MESSAGE, 400)
    elif (not password):
        return string_response(NO_PASSWORD_MESSAGE, 400)

    try:
        user = db.users.find_one(
            {"email": email}
        )
    except OperationFailure:
        return string_response(SERVER_ERROR, 500)
    
    if (not user or not check_password_hash(user["password"], password)):
        return string_response("Email or password is incorrect", 400)
    
    user_id = str(user["_id"])

    # get the user's preferences, which will be returned
    try:
        result = db.user_preferences.find_one(
            {"email": email }
        )
    except OperationFailure:
        return string_response(SERVER_ERROR, 500)

    if not user["emailVerified"]:
        try:
            send_verification_email(email, user_id)
        except HTTPError as e:
            print(e.to_dict)

    # get the jwt token for this response
    result["token"] = encode_auth_token(user_id)
    result["_id"] = user_id
    result["emailVerified"] = user["emailVerified"]

    response = make_response()
    response.status_code = 200
    response.response = json.dumps(result)
    response.mimetype = JSON_MIME_TYPE

    return response

@auth.route('/users/logout', methods=["POST"])
def logout_user():
    """Logout the user

    Check to see if submitted token is valid
    Add token to blacklist in database so it cannot be used anymore

    Request:
        Headers:
            Authorization:
                must be of the form "Bearer <token>" where token is the user's JWT


    Returns:
        A Response object

        if token is invalid:
            - status_code: 403,
            - data: "Invalid Token"

        if database cannot be accessed:
            - status_code: 500,
            - data: "Cannot complete request"

        if successfully logged out:
            - status_code: 200,
            - data: "Logged out successfully"

    """

    token = is_valid_jwt(request)

    if (not token): 
        return string_response(INVALID_TOKEN_MESSAGE, 403)

    try:
        db.blacklisted_tokens.insert_one({
            "token": token,
            "blacklisted_at": datetime.now()
        })

    except OperationFailure:
        return string_response(SERVER_ERROR, 500)

    return string_response("Logged out successfully", 200)


@auth.route('/users/refresh', methods=["POST"])
def refresh_token():
    """Refresh the user's JWT

    Check to make sure current JWT is valid and if it is add the token to the blacklist
    Return a new token to the user

    Request:
        Headers:
            Authorization:
                must be of the form "Bearer <token>" where token is the user's JWT
        Body:
            user_id: the user's id as a string

    Returns:
        A Response object

        if token is invalid:
            - status_code: 403,
            - data: "Invalid token"

        if database cannot be accessed:
            - status_code: 500,
            - data: "Cannot complete request"

        if success:
            - status_code: 200,
            - data: the user's new token as a string
    """
    token = is_valid_jwt(request)

    if (not token): 
        return string_response(INVALID_TOKEN_MESSAGE, 403)

    user_id = request.get_json()["user_id"]

    try:
        db.blacklisted_tokens.insert_one({
            "token": token,
            "blacklisted_at": datetime.now()
        })

    except OperationFailure:
        return string_response("Server error", 500)
    
    response = make_response()
    response.status_code = 200
    response.data = encode_auth_token(user_id)
    response.mimetype = JSON_MIME_TYPE

    return response

@auth.route('/users', methods=["DELETE"])
def delete_user():
    """Deletes a user from the database

    Removes records from auth collection and user preferences collection

    Request:
        Body:
            email: the user's email

    Returns:
        A Response object

        - if email not provided:
            status_code: 400,
            data: "Email must be provided"

        - if user info not in database:
            status_code: 400,
            data: "User does not exist"

        - if database cannot be accessed:
            status_code: 500,
            data: "Cannot delete user"

        - if user is successfully deleted:
            status_code: 200,
            data: "Deleted successfully"

    """
    email = request.get_json()["email"]

    if (not email):
        return string_response(NO_EMAIL_MESSAGE, 400)

    try:
        user_result = db.users.find_one_and_delete({"email": email})
        pref_result = db.user_preferences.find_one_and_delete({ "email": email })
        
        if (not user_result and not pref_result):
            return string_response("User does not exist", 400)

    except OperationFailure:
        return string_response("Cannot delete user", 500)

    return string_response("Deleted successfully", 200)

@auth.route('/users/verifyEmail/<token>', methods=['GET'])
def verify_email(token):
    """Verifies a user's email

    Checks to make sure the token is a valid token and then blacklists the token and sets the user's email to a verified status
    An HTML page is returned that tells the user to go back to the app.

    Args:
        token: the JWT token the user was given to check their email with

    Returns:
        A response object

        if the token is invalid:
            status_code: 403
            message: "Invalid token"

        if the server cannot be accessed:
            status_code: 500
            message: "Cannot verify email right now."

        if successful:
            status_code: 200
            message: "Hello! You have successfully verified your email! You can return to the app now!"
    """
    token, user_id = is_valid_jwt_no_request(token)

    if not token:
        return string_response(INVALID_TOKEN_MESSAGE, 403)

    try:
        db.users.update_one(
            { '_id': ObjectId(user_id) },
            { '$set': { 'emailVerified': True }}
        )

        db.blacklisted_tokens.insert_one({
            "token": token,
            "blacklisted_at": datetime.now()
        })
    except OperationFailure:
        return string_response("Cannot verify email right now.", 200)

    return string_response("Hello! You have successfully verified your email! You can return to the app now!", 200)

@auth.route('/users/resendEmailVerification', methods=['POST'])
def resend_verification():
    """Sends the verification email to the user's email

    Checks to see if the user's auth token is valid and then sends the email to the user

    Request:
        Headers:
            Authorization:
                must be of the form "Bearer <token>" where token is the user's JWT
        Body:
            id: the user's id as a string
            email: the user's email as a string

    Returns:
        A Response object

        - if token is invalid:
            status_code: 403
            message: "Invalid token"

        - if all parameters not included:
            status_code: 400
            message: "Must include user id and email"

        - if email cannot be sent:
            status_code: 500
            message: "Email cannot be sent"

        - if email is sent:
            status_code: 200
            message: "Email sent"
    
    """
    token = is_valid_jwt(request)

    if (not token): 
        return string_response(INVALID_TOKEN_MESSAGE, 403)

    try:
        user_id = request.get_json(force=True)['id']
        email = request.get_json(force=True)['email']
    except KeyError:
        return string_response("Must include user id and email", 400)
        
    try:
        send_verification_email(email, user_id)
        return string_response("Email sent", 200)
    except HTTPError as e:
        print(e.to_dict())
        return string_response("Email cannot be sent", 500)

@auth.route('/users/<token>', methods=['GET'])
def get_user(token):
    """Get the information for a specific user

    Check to make sure the token is valid.
    Return the user's data

    Args:
        token: the user's JWT

    Returns:
        A Response object

        - if token is invalid:
            status_code: 403
            message: "Invalid token"

        - if server cannot be accessed:
            status_code: 500
            message: "Cannot complete request"

        - if successful
            status_code: 200
            data: JSON object with user id, email, email verification status, list of stats, and list of teams
    """
    user_token, user_id = is_valid_jwt_no_request(token)
    
    if (not user_token): 
        return string_response(INVALID_TOKEN_MESSAGE, 403)

    try:
        user = db.users.find_one(
            { '_id': ObjectId(user_id) }
        )

        preferences = db.user_preferences.find_one(
            { 'email': user['email']}
        )

        result = dict()
        result["_id"] = user_id
        result["email"] = user["email"]
        result["emailVerified"] = user["emailVerified"]
        result["stats"] = preferences["stats"]
        result["teams"] = preferences["teams"]

        response = make_response()
        response.data = json.dumps(result)
        response.status_code = 200
        response.mimetype = JSON_MIME_TYPE

        return response

    except OperationFailure:
        return string_response(SERVER_ERROR, 500)
        

@auth.route('/users/changeEmail', methods=['POST'])
def change_email():
    token = is_valid_jwt(request)

    if (not token): 
        return string_response(INVALID_TOKEN_MESSAGE, 403)

    try:
        new_email = request.get_json()['new_email']
        old_email = request.get_json()['old_email']
    except KeyError:
        return string_response("Must submit both old email and new email", 400)

    try:

        email_exists = db.users.find_one(
            { 'email': new_email }
        )

        if email_exists:
            return string_response("There is already a user with that email", 409)

        user = db.users.find_one_and_update(
            { 'email': old_email },
            { '$set': { 
                'email': new_email,
                'emailVerified': False 
            }},
            return_document=ReturnDocument.AFTER
        )

        db.user_preferences.update_one(
            { 'email': old_email },
            { '$set': { 'email': new_email }}
        )

    except OperationFailure:
        return string_response(SERVER_ERROR, 500)

    try:
        send_verification_email(new_email, user["_id"])
    except HTTPError:
        print("Cannot send email")

    return string_response("Successfully changed", 200)

# send the forgot password email if email in db
@auth.route('/users/forgotPassword', methods=['POST'])
def send_forgot_email():
    
    try:
        email = request.get_json()['email']
    except KeyError:
        return string_response(NO_EMAIL_MESSAGE, 400)

    try:
        user = db.users.find_one(
            { 'email': email }
        )

        if (not user):
            return string_response("No user with that email exists", 404)
    except OperationFailure:
        return string_response(SERVER_ERROR, 500)

    try:
        send_forgot_password_email(email, user["_id"])
        return string_response("Email sent", 200)
    except HTTPError:
        return string_response("Email not sent", 500)


# send HTML page where user can reset password
@auth.route('/users/forgotPassword/<token>', methods=['GET', 'POST'])
def reset_password(token):
    returned_token, user_id = is_valid_jwt_no_request(token)

    if not returned_token:
        # make this a link expired page eventually
        return string_response(INVALID_TOKEN_MESSAGE, 403)

    if request.method == 'GET':
        return render_template("resetPassword.html")

    elif request.method == 'POST':
        new_password = request.form['password']

        hashed_password=generate_password_hash(new_password, method='sha256')

        try:
            db.user.update_one(
                { '_id', user_id },
                { '$set': { 'password': hashed_password }}
            )

            # Eventually make success page
            return string_response("Password updated. Return to app and login!")
        except OperationFailure:
            return string_response(SERVER_ERROR, 500)