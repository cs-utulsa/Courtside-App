from flask import Blueprint, request, render_template, make_response
from pymongo.errors import OperationFailure
from pymongo import ReturnDocument
from python_http_client.exceptions import HTTPError
from datetime import datetime
from bson import ObjectId
import json

from db import db
from utils.jwt_utils import is_valid_jwt_no_request, is_valid_jwt
from utils.response_utils import string_response, INVALID_TOKEN_MESSAGE, SERVER_ERROR, JSON_MIME_TYPE
from utils.email_utils import send_verification_email

email = Blueprint("verify_email", __name__)

@email.route('/users/verifyEmail/<token>', methods=['GET'])
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

    return render_template('pages/verifyEmailSuccessPage.html')

@email.route('/users/resendEmailVerification', methods=['POST'])
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
    except HTTPError:
        return string_response("Email cannot be sent", 500)  

@email.route('/users/changeEmail', methods=['POST'])
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
        return string_response("Cannot send email", 500)

    return string_response("Successfully changed", 200)