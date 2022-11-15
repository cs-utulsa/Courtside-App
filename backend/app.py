from flask import Flask, jsonify, request
from pymongo import MongoClient
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

# Main method
if __name__ == "__main__":
    app.run(debug=True)
