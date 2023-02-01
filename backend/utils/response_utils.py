from flask import make_response

NO_EMAIL_MESSAGE = "Email must be provided"
NO_PASSWORD_MESSAGE = "Password must be provided"
JSON_MIME_TYPE = "application/json"
INVALID_TOKEN_MESSAGE = "Invalid token"
SERVER_ERROR = "Cannot complete request"

def string_response(message, code):
    """Creates a HTTP Response with a single message

    Args:
        message: string
            The message to be sent as the data of the response
        code: number
            The HTTP code of the response

    Returns:
        An instance of the Response class with the data of the response as the given message 
        and the status code of the response as the specified code
    
    """
    response = make_response()
    response.data = message
    response.status_code = code
    return response