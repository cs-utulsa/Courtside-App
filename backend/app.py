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

# Return roster of player id's for specified team
@app.route('/roster/<team_code>', methods=['GET'])
def get_roster(team_code):
    return db.rosters.find_one({'_id': team_code})

# Return leaderboard for specified stat/season
@app.route('/leaderboard/<stat>', methods=['GET'])
def get_leaderboard(stat):
    return db.leaderboards.find_one({'_id': stat})

# Return schedule for a requested day
@app.route('/schedule/<int:month>/<int:day>', methods=['GET'])
def get_schedule(month, day):
    if month in [10,11,12]:
        check_str = f"{str(month).rjust(2,'0')}{str(day).rjust(2, '0')}{2022}"
    else:
        check_str = f"{str(month).rjust(2,'0')}{str(day).rjust(2, '0')}{2023}"
    games = db.schedule.find({'_id': {'$regex': '.*' + check_str}})
    return {x['_id']:x['schedule'] for x in games}

# Return bio data for a specified player
@app.route('/player/<player_id>', methods=['GET'])
def get_player_data(player_id):
    return db.player_data.find_one({'_id': player_id})

# Main method
if __name__ == "__main__":
    load_dotenv()
    app.run(debug=True)