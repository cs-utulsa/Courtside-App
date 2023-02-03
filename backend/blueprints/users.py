from flask import Blueprint, request, render_template, make_response
from pymongo.errors import OperationFailure
from bson import ObjectId
import json

from db import db
from utils.response_utils import string_response, NO_EMAIL_MESSAGE, INVALID_TOKEN_MESSAGE, JSON_MIME_TYPE, SERVER_ERROR
from utils.jwt_utils import is_valid_jwt_no_request


users = Blueprint('users', __name__)

@users.route('/users/<token>', methods=['GET'])
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

@users.route('/users', methods=["DELETE"])
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