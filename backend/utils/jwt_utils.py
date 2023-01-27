from datetime import datetime, timedelta
import jwt
import os
from db import db

def encode_auth_token(user_id):
    """Creates a token for the user

    Create a payload with the user's id. The expiration date is a week from token creation.
    Encode the payload and return it to the user

    Args: 
        user_id: the id of the user as a string

    Returns: the user's token as a string
    """
    try:
        payload = {
            'exp': datetime.utcnow() + timedelta(weeks=1),
            'iat': datetime.utcnow(),
            'sub': user_id
        }
        
        return jwt.encode(
            payload,
            os.getenv("JWT_SECRET"),
            algorithm='HS256'
        )
    except Exception as e:
        return e

def encode_email_token(user_id):
    try:
        payload = {
            'exp': datetime.utcnow() + timedelta(minutes=10),
            'iat': datetime.utcnow(),
            'sub': user_id
        }

        return jwt.encode(
            payload,
            os.getenv("JWT_SECRET"),
            algorithm='HS256'
        )
    except Exception as e:
        return e

def decode_auth_token(token):
    """Decodes a token back into the payload

    Args: 
        token: the user's token as a string

    Returns:
        - if the token is invalid:
            'Invalid token. Please log in again.'

        - if the token has expired (i.e. existed for more than a week)
            'Signature expired. Please log in again.'

        - if the token is found in the blacklist
            'Token blacklisted. Please log in again.'

        - if successfully decoded
            The payload is returned

    """
    
    try:
        payload = jwt.decode(
            token, 
            os.getenv("JWT_SECRET"),
            algorithms=["HS256"]
        )
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'

    result = db.blacklisted_tokens.find_one(
            {"token": token}
        )

    if result:
        return 'Token blacklisted. Please log in again.'

    return payload

def is_valid_jwt(request):
    """Checks to see if a given JWT is a valid token

    Gets the token from the auth header and then decodes it.

    Args:
        request: the HTTP request sent to the server. The request should have an Authorization header

    Returns:
        - if token is not in Authorization header or auth token cannot be decoded:
            False

        - if token is decoded and valid
            True
    """

    auth_header = request.headers.get('Authorization')

    token = ''
    if auth_header:
        token = auth_header.split(" ")[1]

    if not token:
        return False

    resp = decode_auth_token(token)

    if isinstance(resp, str):
        return False

    return token
