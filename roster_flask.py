from flask import Flask, jsonify, request
import pandas as pd

app = Flask(__name__)

# Return roster of player id's for specified team
@app.route('/roster/<team_code>', methods=['GET'])
def get_roster(team_code):
    roster = pd.read_csv(f"data\\rosters\\{team_code}_2023.csv", index_col=0)
    return jsonify({"roster": roster['player_id'].tolist()})

# Return leaderboard for specified stat/season
@app.route('/leaderboard/<stat>/<int:season>')
def get_leaderboard(stat, season):
    leaderboard = pd.read_csv(f"data\\leaderboards\\{stat}_{season}.csv", index_col=0)
    return leaderboard.to_json(orient="index")

# Main method
if __name__ == "__main__":
    app.run(debug=True)
    