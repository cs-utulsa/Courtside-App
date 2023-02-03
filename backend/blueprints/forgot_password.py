from flask import Blueprint, request, render_template
from werkzeug.security import generate_password_hash
from pymongo.errors import OperationFailure
from python_http_client.exceptions import HTTPError
from datetime import datetime
from bson import ObjectId

from db import db
from utils.jwt_utils import is_valid_jwt_no_request
from utils.response_utils import string_response, INVALID_TOKEN_MESSAGE, NO_EMAIL_MESSAGE, SERVER_ERROR, JSON_MIME_TYPE, NO_PASSWORD_MESSAGE
from utils.email_utils import send_forgot_password_email

forgot_password = Blueprint('forgot_password', __name__)

# send the forgot password email if email in db
@forgot_password.route('/users/forgotPassword', methods=['POST'])
def send_forgot_email():
    
    try:
        email = request.get_json()['email']
    except KeyError:
        return string_response(NO_EMAIL_MESSAGE, 400)

    try:
        user = db.users.find_one(
            { 'email': email }
        )
        print(user)
        if (not user):
            return string_response("No user with that email exists", 404)
    except OperationFailure:
        return string_response(SERVER_ERROR, 500)

    try:
        send_forgot_password_email(email, str(user["_id"]))
        return string_response("Email sent", 200)
    except HTTPError:
        return string_response("Email not sent", 500)


# send HTML page where user can reset password
@forgot_password('/users/forgotPassword/<token>', methods=['GET', 'POST'])
def reset_password(token):
    returned_token, user_id = is_valid_jwt_no_request(token)

    if not returned_token:
        # make this a link expired page eventually
        return render_template('pages/invalidTokenPage.html')

    if request.method == 'GET':
        return render_template("pages/resetPasswordPage.html")

    elif request.method == 'POST':
        new_password = request.form['password']

        hashed_password=generate_password_hash(new_password, method='sha256')

        try:
            db.users.update_one(
                { '_id': ObjectId(user_id) },
                { '$set': { 'password': hashed_password }}
            )

            db.blacklisted_tokens.insert_one({
                "token": returned_token,
                "blacklisted_at": datetime.now()
            })

            # Eventually make success page
            return render_template('pages/passwordResetSuccessPage.html')
        except OperationFailure:
            return render_template('pages/serverErrorPage.html')