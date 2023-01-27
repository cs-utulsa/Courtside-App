from flask import Blueprint, request, make_response
from pymongo.errors import OperationFailure
from werkzeug.security import generate_password_hash, check_password_hash
import json
from datetime import datetime

from db import db
from utils.jwt_utils import encode_auth_token, is_valid_jwt
from utils.response_utils import string_response, INVALID_TOKEN_MESSAGE, NO_EMAIL_MESSAGE, SERVER_ERROR, JSON_MIME_TYPE, NO_PASSWORD_MESSAGE

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
        db.user_preferences.insert_one(user);

    except OperationFailure:
        # return error if database cannot be accessed
        return string_response(SERVER_ERROR, 500)
    
    user["token"] = encode_auth_token(user_id) # add jwt token to user

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

    # get the jwt token for this response
    result["token"] = encode_auth_token(user_id)
    result["_id"] = user_id

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


