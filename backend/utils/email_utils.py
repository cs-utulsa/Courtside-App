import os
from dotenv import load_dotenv
from sendgrid import Email, To, Content, Mail
from flask import render_template

from email_client import sg
from utils.jwt_utils import encode_email_token

load_dotenv()
def send_verification_email(email, user_id):
    """Sends the user an email with a link that allows them to confirm their email

    Encodes a 10 minute token for the email and sends the email with the verifyEmail template to the user

    Args:
        email: the address to send the email to
        user_id: the id of the user the email is being sent to

    Returns:
        None
    """

    token = encode_email_token(user_id)

    server_url = os.getenv("SERVER_URL")

    url = f'{server_url}/users/verifyEmail/{token}'

    from_email = Email(os.getenv("EMAIL_FROM"))
    to_email = To(email)
    subject = "Verify Your Email for Courtside"
    content = Content("text/html", render_template('verifyEmailEmail.html', url=url))

    mail = Mail(from_email, to_email, subject, content)

    sg.send(mail)

def send_forgot_password_email(email, user_id):
    token = encode_email_token(user_id)

    server_url = os.getenv("LOCAL_URL")

    url = f'{server_url}/users/forgotPassword/{token}'

    from_email = Email(os.getenv("EMAIL_FROM"))
    to_email = To(email)
    subject = "Reset Your Password for Courtside"
    content = Content("text/html", render_template("forgotPasswordEmail.html", url=url))

    mail = Mail(from_email, to_email, subject, content)

    sg.send(mail)
