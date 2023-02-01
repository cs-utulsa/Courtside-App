from flask import Blueprint, request, make_response
from pymongo.errors import OperationFailure
import json

from db import db
from utils.jwt_utils import is_valid_jwt
from utils.response_utils import string_response, INVALID_TOKEN_MESSAGE, NO_EMAIL_MESSAGE, SERVER_ERROR, JSON_MIME_TYPE

preferences = Blueprint('preferences', __name__)

@preferences.route('/users/teams', methods=["PATCH"])
def change_teams():
    """Updates the teams the user is following

    Check to make sure the user's token is valid.
    Update the array of team ids in the database.

    Request:
        Headers:
            Authorization:
                must be of the form "Bearer <token>" where token is the user's JWT
        Body:
            email: the user's email
            teams: a string array of team ids

    Returns:
        A Response object

        - if token not valid
            status_code: 403
            data: "Invalid Token"

        - if email not provided
            status_code: 400
            data: "Email must be provided

        - if database cannot be accessed
            status_code: 500
            data: "Cannot add teams to user"

        - if success
            status_code: 200
            data: the updated list of teams the user is following

    """

    token = is_valid_jwt(request)

    if (not token): 
        return string_response(INVALID_TOKEN_MESSAGE, 403)

    email = request.get_json()["email"]
    teams = request.get_json()["teams"]

    if (not email):
        return string_response(NO_EMAIL_MESSAGE, 400)

    try:
        db.user_preferences.update_one(
            { 'email': email },
            { '$set': { "teams": teams} }
        )

        response = make_response()
        response.status_code = 200
        response.response = json.dumps(teams)
        response.mimetype = JSON_MIME_TYPE

        return response
    except OperationFailure:
        return string_response("Cannot add teams to user", 500)
    


@preferences.route('/users/leaderboards', methods=["PATCH"])
def change_stats():
    """Updates the stats the user is following

    Check to make sure the user's token is valid.
    Update the array of stat ids in the database.

    Request:
        Headers:
            Authorization:
                must be of the form "Bearer <token>" where token is the user's JWT
        Body:
            email: the user's email
            stats: a string array of team ids

    Returns:
        A Response object

        - if token not valid
            status_code: 403
            data: "Invalid Token"

        - if email not provided
            status_code: 400
            data: "Email must be provided

        - if database cannot be accessed
            status_code: 500
            data: "Cannot add stats to user"

        - if success
            status_code: 200
            data: the updated list of teams the user is following

    """
    token = is_valid_jwt(request)

    if (not token): 
        return string_response(INVALID_TOKEN_MESSAGE, 403)

    email = request.get_json()["email"]
    stats = request.get_json()["stats"]

    if (not email):
        return string_response(NO_EMAIL_MESSAGE, 400)

    try:
        db.user_preferences.update_one(
            { 'email': email },
            { '$set': { "stats": stats } }
        );

        response = make_response()
        response.status_code = 200
        response.response = json.dumps(stats)
        response.mimetype = JSON_MIME_TYPE

        return response
    except OperationFailure:
        return string_response("Cannot add stats to user", 500)

@preferences.route('/users/settings', methods=["PUT"])
def change_settings():
    # settings not implemented yet
    pass

@preferences.route('/users/clear', methods=["POST"])
def clear_data():
    """Removes all user preferences from the servers

    Check to make sure user's token is valid and then set stat and team data to empty arrays

    Request:
        Headers:
            Authorization:
                must be of the form "Bearer <token>" where token is the user's JWT
        Body:
            email: the user's email

    Returns:
        A Response object

        - if token not valid:
            status_code: 403
            message: 'Invalid token'

        - if email not provided
            status_code: 400
            message: 'Email must be provided'

        - if server cannot be accessed
            status_code: 500
            message: 'Cannot complete request'

        - if data successfully cleared
            status_code: 200
            message: 'User data cleared'
    
    """
    token = is_valid_jwt(request)

    if (not token): 
        return string_response(INVALID_TOKEN_MESSAGE, 403)

    email = request.get_json()['email']

    if not email:
        return string_response(NO_EMAIL_MESSAGE, 400)

    try:
        db.user_preferences.update_one(
            { 'email': email },
            { '$set': { "stats": [], "teams": [] } }
        )

    except OperationFailure:
        return string_response(SERVER_ERROR, 500)

    return string_response("User data cleared", 200)