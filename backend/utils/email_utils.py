import os
from dotenv import load_dotenv
from sendgrid.helpers.mail import Email, To, Content, Mail
from flask import render_template

from email_client import sg
from utils.jwt_utils import encode_email_token

load_dotenv()
def send_verification_email(email, user_id):

    token = encode_email_token(user_id)

    server_url = os.getenv("SERVER_URL")

    url = f'http://localhost:5000/users/verifyEmail/{token}'

    from_email = Email(os.getenv("email_from"))
    to_email = To(email)
    subject = "Verify Your Email for Courtside"
    content = Content("text/html", render_template('verifyEmail.html', url=url))

    mail = Mail(from_email, to_email, subject, content)

    sg.send(mail)
