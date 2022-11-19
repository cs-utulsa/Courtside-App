from pymongo import MongoClient
import os

client = MongoClient(os.getenv("MONGO_URL"), connectTimeoutMS=30000, socketTimeoutMS=None, connect=False, maxPoolsize=1)
db = client.courtside