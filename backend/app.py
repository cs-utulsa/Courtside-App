from auth import auth as auth_blueprint
from flask import Flask, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
from db import db
import pandas as pd
import pymongo
import os

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_blueprint)

@app.route('/test', methods=['GET'])
def test_api():
    return jsonify('test')

# Return roster of player id's for specified team
@app.route('/roster/<team_code>', methods=['GET'])
def get_roster(team_code):
    return db.rosters.find_one({'_id': f'{team_code}_roster'})

# Return leaderboard for specified stat/season
@app.route('/leaderboard/<stat>', methods=['GET'])
def get_leaderboard(stat):
    leaderboard = db.leaderboards.find_one({'_id': f'{stat}'})
    leaderboard["player_id"] = leaderboard["player_id"][0:5]
    leaderboard["value"] = leaderboard["value"][0:5]

    player_names_cursor = db.player_data.find(
        { "_id": { "$in": leaderboard["player_id"]}}
    )

    player_document = list(player_names_cursor)
    
    leaderboard["player_names"] = []
    cursor = 0
    for i in range(0, len(leaderboard["player_id"])):
        if (leaderboard["player_id"][i] == player_document[cursor]["data"][0]):
            name = player_document[cursor]["data"][1]
            leaderboard["player_names"].append(name)
            cursor += 1
        else:
            leaderboard["player_names"].append(leaderboard["player_id"][i])

    return leaderboard

# Return schedule for a requested day
@app.route('/schedule/<int:month>/<int:day>', methods=['GET'])
def get_schedule(month, day):
    schedule = db.schedule.find_one({'_id': 'schedule_2023'})
    if month in [10,11,12]:
        check_str = f"{str(month).rjust(2,'0')}{str(day).rjust(2, '0')}{2022}"
    else:
        check_str = f"{str(month).rjust(2,'0')}{str(day).rjust(2, '0')}{2023}"
    good_keys = []
    for i in list(schedule.keys()):
        if i == '_id':
            continue
        if i.split('-')[2] == check_str:
            good_keys.append(i)
    return {i:schedule[i] for i in good_keys}

# Main method
if __name__ == "__main__":
    load_dotenv()
    app.run(debug=True)