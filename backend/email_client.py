import os
from sendgrid import SendGridAPIClient
from dotenv import load_dotenv

load_dotenv()

sg = SendGridAPIClient(os.getenv('SENDGRID_API_KEY'))