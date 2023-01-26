from auth import auth as auth_blueprint
from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS
from db import db
import pandas as pd
import json
from utils.data_utils import schedule_key

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_blueprint)

# Return roster of player id's for specified team
@app.route('/roster/<team_code>', methods=['GET'])
def get_roster(team_code):
    if type(team_code) == str:
        return db.teams.find_one({'abbr': team_code})['roster']
    else:
        return db.teams.find_one({'_id': team_code})['roster']

# Return leaderboard for specified stat
# --- per_mode can be either tot, pg, or p48
@app.route('/leaderboard/<stat>/<per_mode>', methods=['GET'])
def get_leaderboard(stat, per_mode):
    leaderboard = db.leaderboards.find_one({'_id': f'{stat}_{per_mode}'})

    # only return first 5 values
    leaderboard["player_id"] = leaderboard["player_id"][0:5]
    leaderboard["value"] = leaderboard["value"][0:5]

    # get players in the leaderboard
    player_names_cursor = db.players.find(
        { "_id": { "$in": leaderboard["player_id"]}},
        { "_id": 1, "name": 1 }
    )

    player_document = list(player_names_cursor)

    leaderboard["player_names"] = [None] * 5

    # Line up player ids with the player's name
    for i in range(0, len(player_document)):
        index = leaderboard["player_id"].index(player_document[i]['_id'])
        leaderboard["player_names"][index] = player_document[i]['name']

    return json.dumps(leaderboard)

@app.route('/leaderboard/<stat>', methods=['GET'])
def get_all_leaderboards(stat):
    leaderboard_cursor = db.leaderboards.aggregate([
        {
            '$match': { '$or': [
                {'_id': f'{stat}_tot'},
                {'_id': f'{stat}_p48'},
                {'_id': f'{stat}_pg' }
            ]}
        }, {
            '$lookup': {
                'from': 'players', 
                'localField': 'player_id', 
                'foreignField': '_id', 
                'as': 'players',
                'pipeline': [
                    { '$project': {
                        'id': '$_id',
                        '_id': 0,
                        'name': 1,
                        'headshot': 1,
                    }}
                ]
            }
        }, {
            '$project': {
                'id': '$_id',
                '_id': 0, 
                'value': 1, 
                'players': 1,
                'per_mode': 1,
                'name': 1,
            }
        }
    ])

    leaderboards = list(leaderboard_cursor)
    name = leaderboards[0]['name']
    for leaderboard in leaderboards:
        del leaderboard['name']

    leaderboards_json = {
        'id': stat,
        'name': name,
        'modes': leaderboards
    }

    return json.dumps(leaderboards_json)

# Return schedule for a requested day
@app.route('/schedule/<int:month>/<int:day>', methods=['GET'])
def get_schedule(month, day):
    if month in [10,11,12]:
        check_str = f"{str(month).rjust(2,'0')}{str(day).rjust(2, '0')}{2022}"
    else:
        check_str = f"{str(month).rjust(2,'0')}{str(day).rjust(2, '0')}{2023}"
    games = db.schedule.find({'_id': {'$regex': '.*' + check_str}})
    res = [x['schedule'] for x in games]
    res.sort(key=schedule_key)
    return res

# Return bio data for a specified player
@app.route('/player/<int:player_id>', methods=['GET'])
def get_player_data(player_id):
    return json.dumps(db.players.find_one({'_id': player_id}))

# Return all teams
@app.route('/team', methods=['GET'])
def get_all_teams():
    """Returns all teams

    Returns:
        A Response object with an array of team data, each team has an id, name, and code
    """
    teams = list(db.teams.find({}, { '_id': 1, 'icon': 1 }))

    for team in teams:
        team["id"] = str(team["_id"])
        del team["_id"]

    return json.dumps(teams)

# return one team
@app.route('/team/<id>', methods=['GET'])
def get_team(id):
    team_cursor = db.teams.aggregate([
        { '$match': { '_id': int(id) }},
        { '$lookup': {
            "from": "players",
            "localField": "roster",
            "foreignField": "_id",
            "as": "players"
        }}
    ])

    team = list(team_cursor)[0]

    del team["roster"]
    
    team["id"] = str(team["_id"])
    del team["_id"]

    return json.dumps(team)

# Main method
if __name__ == "__main__":
    load_dotenv()
    app.run(debug=True)