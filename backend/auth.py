from flask import Blueprint, request, make_response
from pymongo.errors import OperationFailure
from werkzeug.security import generate_password_hash, check_password_hash
import json

from db import db

auth = Blueprint('auth', __name__)

NO_EMAIL_MESSAGE = "Email must be provided"
NO_PASSWORD_MESSAGE = "Password must be provided"

def error_response(code, message):
    response = make_response()
    response.data = message
    response.status_code = code
    return response

@auth.route('/users/signup', methods=["POST"])
def create_user():
    email = request.form.get("email")
    password = request.form.get("password")

    if (not email):
        return error_response(NO_EMAIL_MESSAGE, 400)
    elif (not password):
        return error_response(NO_PASSWORD_MESSAGE, 400)

    if (db.users.find_one({ "email": email})):
        return error_response(409, "Email already exists")
    
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
        return error_response(500, "Cannot complete request")
    
    user["_id"] = str(user["_id"]);

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
        return error_response(NO_EMAIL_MESSAGE, 400)
    elif (not password):
        return error_response(NO_PASSWORD_MESSAGE, 400)

    user = db.users.find_one(
        {"email": email}
    )
    
    if (not user or not check_password_hash(user["password"], password)):
        return error_response("Email or password is incorrect", 400)

    user["_id"] = str(user["_id"]);

    response = make_response()
    response.status_code = 200
    response.response = json.dumps(user)
    response.mimetype = 'application/json'

    return response

@auth.route('/users', methods=["DELETE"])
def delete_user():
    email = request.get_json()["email"]

    if (not email):
        return error_response("Email must be provided", 400)

    try:
        result = db.users.find_one_and_delete({"email": email})
        if (not result):
            return error_response("User does not exist", 400)
    except OperationFailure:
        return error_response("Cannot delete user", 500)

    return error_response("Deleted successfully", 200)
