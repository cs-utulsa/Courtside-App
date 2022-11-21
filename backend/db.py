from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
client = MongoClient(os.getenv("MONGO_URL"), connectTimeoutMS=5000, socketTimeoutMS=None, connect=False, maxPoolsize=1)
db = client.courtside
