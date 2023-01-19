from flask import Blueprint, request, make_response
from pymongo.errors import OperationFailure
from werkzeug.security import generate_password_hash, check_password_hash
import json
from datetime import datetime

from db import db
from utils.jwt_utils import encode_auth_token, is_valid_jwt

auth = Blueprint('auth', __name__)

NO_EMAIL_MESSAGE = "Email must be provided"
NO_PASSWORD_MESSAGE = "Password must be provided"
JSON_MIME_TYPE = "application/json"
INVALID_TOKEN_MESSAGE = "Invalid token"

def string_response(message, code):
    response = make_response()
    response.data = message
    response.status_code = code
    return response

@auth.route('/users/register', methods=["POST"])
def create_user():
    email = request.get_json()["email"]
    password = request.get_json()["password"]

    if (not email):
        return string_response(NO_EMAIL_MESSAGE, 400)
    elif (not password):
        return string_response(NO_PASSWORD_MESSAGE, 400)

    if (db.users.find_one({ "email": email})):
        return string_response("Email already exists", 409)
    
    user = None
    hashed_password=generate_password_hash(password, method='sha256')
    try: 
        insert_user_obj = db.users.insert_one(
            { 
                "email": email,
                "password": hashed_password,
            }
        );

        user_id = str(insert_user_obj.inserted_id)
        user = {
            "email": email,
            "stats": [],
            "teams": []
        }

        db.user_preferences.insert_one(user);

    except OperationFailure:
        return string_response("Cannot complete request", 500)
    
    user["token"] = encode_auth_token(user_id) # add jwt token to user

    response = make_response()
    response.status_code = 200
    response.response = json.dumps(user)
    response.mimetype = JSON_MIME_TYPE

    return response

@auth.route('/users/login', methods=["POST"])
def login_user():
    email = request.get_json()["email"]
    password = request.get_json()["password"]

    if (not email):
        return string_response(NO_EMAIL_MESSAGE, 400)
    elif (not password):
        return string_response(NO_PASSWORD_MESSAGE, 400)

    user = db.users.find_one(
        {"email": email}
    )
    
    if (not user or not check_password_hash(user["password"], password)):
        return string_response("Email or password is incorrect", 400)
    
    user["_id"] = str(user["_id"])

    # get the user's preferences, which will be returned
    result = db.user_preferences.find_one(
        {"email": email }
    )

    # get the jwt token for this response
    result["token"] = encode_auth_token(user["_id"])

    response = make_response()
    response.status_code = 200
    response.response = json.dumps(result)
    response.mimetype = JSON_MIME_TYPE

    return response

@auth.route('/users/logout', methods=["POST"])
def logout_user():

    token = is_valid_jwt(request)

    if (not token): 
        return string_response(INVALID_TOKEN_MESSAGE, 403)

    try:
        db.blacklisted_tokens.insert_one({
            "token": token,
            "blacklisted_at": datetime.now()
        })

    except Exception as e:
        return string_response("Server error", 500)

    return string_response("Logged out successfully", 200)


@auth.route('/users/refresh', methods=["POST"])
def refresh_token():
    token = is_valid_jwt(request)

    if (not token): 
        return string_response(INVALID_TOKEN_MESSAGE, 403)

    user_id = request.get_json()["user_id"]

    try:
        db.blacklisted_tokens.insert_one({
            "token": token,
            "blacklisted_at": datetime.now()
        })

    except Exception as e:
        return string_response("Server error", 500)
    
    response = make_response()
    response.status_code = 200
    response.data = encode_auth_token(user_id)
    response.mimetype = JSON_MIME_TYPE

    return response

@auth.route('/users', methods=["DELETE"])
def delete_user():
    email = request.get_json()["email"]

    if (not email):
        return string_response("Email must be provided", 400)

    try:
        user_result = db.users.find_one_and_delete({"email": email})
        pref_result = db.user_preferences.find_one_and_delete({ "email": email })
        
        if (not user_result and not pref_result):
            return string_response("User does not exist", 400)

    except OperationFailure:
        return string_response("Cannot delete user", 500)

    return string_response("Deleted successfully", 200)

@auth.route('/users/teams', methods=["PATCH"])
def change_teams():

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
    


@auth.route('/users/leaderboards', methods=["PATCH"])
def change_stats():
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

@auth.route('/users/settings', methods=["PUT"])
def change_settings():
    # settings not implemented yet
    pass
