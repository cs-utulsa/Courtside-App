from datetime import datetime, timedelta
import jwt
import os
from db import db

def encode_auth_token(user_id):
    try:
        payload = {
            'exp': datetime.utcnow() + timedelta(minutes=30),
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
