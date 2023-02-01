from utils.data_utils import schedule_key
from auth import auth as auth_blueprint
from dotenv import load_dotenv
from flask_cors import CORS
from flask import Flask
from db import db
import pandas as pd
import pickle
import json

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_blueprint)

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

# Return roster of player id's for specified team
@app.route('/roster/<team_code>', methods=['GET'])
def get_roster(team_code):
    if type(team_code) == str:
        return db.teams.find_one({'abbr': team_code})['roster']
    else:
        return db.teams.find_one({'_id': team_code})['roster']

# Return all teams
@app.route('/team', methods=['GET'])
def get_all_teams():
    """Returns all teams

    Returns:
        A Response object with an array of team data, each team has an id, name, and code
    """
    teams = list(db.teams.find({}, { '_id': 1, 'name': 1, 'abbr': 1}))

    for team in teams:
        team["id"] = str(team["_id"])
        team["code"] = team['abbr']
        del team["_id"]
        del team['abbr']

    return json.dumps(teams)

# return one team
@app.route('/team/<code>', methods=['GET'])
def get_team(code):
    """Returns the data for the team with the specified code

    Args:
        code: the team's three letter code as a string

    Returns:
        A Response object with the team's data including its id, name, and code
    """
    team = db.teams.find_one({ 'abbr': code}, { '_id': 1, 'name': 1, "abbr": 1})

    team["id"] = str(team["_id"])
    del team["_id"]

    team["code"] = team["abbr"]
    del team ["abbr"]

    return json.dumps(team)

gpr = pickle.load(open('model\gpr_model_small.pkl', 'rb'))
league_stats = pd.read_csv('data\league_stats.csv')

# Return predicted scores for a specified matchup
@app.route('/score/<team1>/<team2>', methods=['GET'])
def get_score(team1, team2):
    team1_id = db.teams.find_one({'abbr': team1})['_id']
    team1_stats = league_stats[league_stats['team_id'] == team1_id]
    team1_stats.reset_index(drop=True, inplace=True)
    team1_off = team1_stats[['off_rtg','off_rtg_10','pace','pace_10']]
    team1_def = team1_stats[['def_rtg','def_rtg_10','pace','pace_10']]
    team1_def.columns = ['opp_def_rtg','opp_def_rtg_10','opp_pace','opp_pace_10']
    
    team2_id = db.teams.find_one({'abbr': team2})['_id']
    team2_stats = league_stats[league_stats['team_id'] == team2_id]
    team2_stats.reset_index(drop=True, inplace=True)
    team2_off = team2_stats[['off_rtg','off_rtg_10','pace','pace_10']]
    team2_def = team2_stats[['def_rtg','def_rtg_10','pace','pace_10']]
    team2_def.columns = ['opp_def_rtg','opp_def_rtg_10','opp_pace','opp_pace_10']
    
    team1_input = pd.concat([team1_off, team2_def], axis=1)
    team2_input = pd.concat([team2_off, team1_def], axis=1)
    
    team1_preds = gpr.predict(team1_input, return_std=True)
    team2_preds = gpr.predict(team2_input, return_std=True)
    json_output = {
        team1: {
            'score': round(team1_preds[0][0], 3),
            'stdev': round(team1_preds[1][0], 3)
        },
        team2: {
            'score': round(team2_preds[0][0], 3),
            'stdev': round(team2_preds[1][0], 3)
        }
    }
    return json_output

# Main method
if __name__ == "__main__":
    load_dotenv()
    app.run(debug=True)