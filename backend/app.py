from flask import Flask, jsonify, request
from pymongo import MongoClient
from pymongo.errors import OperationFailure
from pymongo.collection import ReturnDocument
from werkzeug.security import generate_password_hash, check_password_hash
import pandas as pd
import json
import os

from dotenv import load_dotenv

app = Flask(__name__)
client = MongoClient(os.getenv("MONGO_URL"))
db = client.courtside

load_dotenv()

# Return roster of player id's for specified team
@app.route('/roster/<team_code>', methods=['GET'])
def get_roster(team_code):
    roster = pd.read_csv(f"rosters\\{team_code}_2023.csv", index_col=0)
    return jsonify({"roster": roster['player_id'].tolist()})

# Return leaderboard for specified stat/season
@app.route('/leaderboard/<stat>', methods=['GET'])
def get_leaderboard(stat):
    leaderboard = pd.read_csv(f"leaderboards\\{stat}_2022.csv")
    return leaderboard.to_json(orient="records")

# Return schedule for a requested day
@app.route('/schedule/<int:month>/<int:day>', methods=['GET'])
def get_schedule(month, day):
    schedule = pd.read_csv(f"schedule\\2023_schedule.csv", index_col=0)
    if month in [10,11,12]:
        day_schedule = schedule[schedule['game_date'] == f"{month}-{day}-2022"]
    else:
        day_schedule = schedule[schedule['game_date'] == f"{month}-{day}-2023"]
    return day_schedule.to_json(orient="index")

@app.route('/users/signin', methods=["POST"])
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
    
    return app.response_class(
        response=json.dumps(user),
        status=200,
        mimetype='application/json'
    )

@app.route('/users/login', methods=["POST"])
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

    return app.response_class(
        response=json.dumps(user),
        status=200,
        mimetype='application/json'
    )

@app.route('/users', methods=["DELETE"])
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


# Main method
if __name__ == "__main__":
    app.run(debug=True)
