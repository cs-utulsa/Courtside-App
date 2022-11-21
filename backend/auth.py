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
        insert_obj = db.users.insert_one(
            { 
                "email": email,
                "password": hashed_password
            }
        )

        user = db.users.find_one(
            {"_id": insert_obj.inserted_id}
        )
    except OperationFailure:
        return string_response("Cannot complete request", 500)
    
    user["_id"] = str(user["_id"]) # turn objectid into string
    user["token"] = encode_auth_token(user["_id"]) # add jwt token to user
    del user["password"]

    response = make_response()
    response.status_code = 200
    response.response = json.dumps(user)
    response.mimetype = 'application/json'

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

    user["_id"] = str(user["_id"]);
    user["token"] = encode_auth_token(user["_id"]);
    del user["password"]

    response = make_response()
    response.status_code = 200
    response.response = json.dumps(user)
    response.mimetype = 'application/json'

    return response

@auth.route('/users/logout', methods=["POST"])
def logout_user():

    token = is_valid_jwt(request)

    if (not token): 
        return string_response("Invalid token", 403)

    try:
        db.blacklisted_tokens.insert_one({
            "token": token,
            "blacklisted_at": datetime.now()
        })

    except Exception as e:
        return string_response("Server error", 500)

    return string_response("Logged out successfully", 200)


@auth.route('/users', methods=["DELETE"])
def delete_user():
    email = request.get_json()["email"]

    if (not email):
        return string_response("Email must be provided", 400)

    try:
        result = db.users.find_one_and_delete({"email": email})
        if (not result):
            return string_response("User does not exist", 400)
    except OperationFailure:
        return string_response("Cannot delete user", 500)

    return string_response("Deleted successfully", 200)

@auth.route('/users/teams', methods=["PATCH"])
def change_teams():

    token = is_valid_jwt(request)

    if (not token): 
        return string_response("Invalid token", 403)

    email = request.get_json()["email"]
    teams = request.get_json()["teams"]

    if (not email):
        return string_response(NO_EMAIL_MESSAGE, 400)

    try:
        db.users.update_one(
            { 'email': email },
            { '$set': { "teams": teams} }
        )

        return string_response("Update successful", 200)
    except OperationFailure:
        return string_response("Cannot add teams to user", 500)
    


@auth.route('/users/leaderboards', methods=["PATCH"])
def change_stats():
    token = is_valid_jwt(request)

    if (not token): 
        return string_response("Invalid token", 403)

    email = request.get_json()["email"]
    stats = request.get_json()["stats"]

    if (not email):
        return string_response(NO_EMAIL_MESSAGE, 400)

    try:
        db.users.update_one(
            { 'email': email },
            { '$set': { "stats": stats } }
        )

        return string_response("Update successful", 200)
    except OperationFailure:
        return string_response("Cannot add stats to user", 500)

@auth.route('/users/settings', methods=["PUT"])
def change_settings():
    # settings not implemented yet
    pass
