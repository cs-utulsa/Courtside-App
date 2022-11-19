from flask import Blueprint, request, make_response
from pymongo.errors import OperationFailure
from werkzeug.security import generate_password_hash, check_password_hash
import json
from datetime import datetime

from db import db
from utils.jwt_utils import encode_auth_token, decode_auth_token

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
    email = request.form.get("email")
    password = request.form.get("password")

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

    response = make_response()
    response.status_code = 200
    response.response = json.dumps(user)
    response.mimetype = 'application/json'

    return response

@auth.route('/users/login', methods=["POST"])
def login_user():
    email = request.form.get("email")
    password = request.form.get("password")

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
    user["token"] = encode_auth_token(user["_id"])

    response = make_response()
    response.status_code = 200
    response.response = json.dumps(user)
    response.mimetype = 'application/json'

    return response

@auth.route('/users/logout', methods=["POST"])
def logout_user():
    auth_header = request.headers.get('Authorization')

    token = ''
    if auth_header:
        token = auth_header.split(" ")[1]

    if not token:
        return string_response("Provide a valid auth token", 403)

    resp = decode_auth_token(token)

    if isinstance(resp, str):
        return string_response(resp, 401)

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
