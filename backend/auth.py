from flask import Blueprint, request, make_response
from pymongo.errors import OperationFailure
from werkzeug.security import generate_password_hash, check_password_hash
import json

from db import db

auth = Blueprint('auth', __name__)

@auth.route('/users/signin', methods=["POST"])
def create_user():
    email = request.form.get("email")
    password = request.form.get("password")

    if (not email):
        return ("Email must be provided", 400)
    elif (not password):
        return ("Password must be provided", 400)

    if (db.users.find_one({ "email": email})):
        return ("Email already exists", 409)
    
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
            {"_id": insert_obj.inserted_id},
            projection={"_id": False}
        )
    except OperationFailure:
        return ("Cannot complete request", 500)
    
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
        return ("Email must be provided", 400)
    elif (not password):
        return ("Password must be provided", 400)

    user = db.users.find_one(
        {"email": email},
        projection={"_id": False}
    )
    
    if (not user or not check_password_hash(user["password"], password)):
        return ("Email or password incorrect", 404)

    response = make_response()
    response.status_code = 200
    response.response = json.dumps(user)
    response.mimetype = 'application/json'

    return response

@auth.route('/users', methods=["DELETE"])
def delete_user():
    email = request.get_json()["email"]

    if (not email):
        return ("Email must be provided", 400)

    try:
        result = db.users.find_one_and_delete({"email": email})
        if (not result):
            return ("User does not exist", 400)
    except OperationFailure:
        return ("Cannot delete user", 500)

    return ("Deleted successfully", 200)
