from flask import Flask, jsonify
from db import db
import bbref_scripts as bbref
import pandas as pd
import constants
import pickle
import os


if __name__ == "__main__":
    # test = db.basketball_stats.find()
    # for x in test:
    #     print(x)


    # # Update rosters collections in mongodb
    # for team in constants.team_codes:
    #     roster = bbref.get_team_roster(team, 2023).to_dict(orient='list')
    #     roster.update({"_id": f"{team}_roster"})
    #     db.rosters.insert_one(roster)


    # # Update leaderboard collections in mongodb
    # for stat in constants.leaderboard_names:
    #     leaderboard = bbref.get_leaderboards(stat, 2022).to_dict(orient='list')
    #     leaderboard.update({"_id": f"{stat.replace('leaders_', '')}"})
    #     with open(f'leaderboards\{stat}.pkl', 'wb') as f:
    #         pickle.dump(leaderboard, f)
    #     print(f'{stat} done')

    # for file in os.listdir('leaderboards'):
    #     with open(f'leaderboards\{file}', 'rb') as f:
    #         leaderboard = pickle.load(f)
    #     db.leaderboards.insert_one(leaderboard)


    # # Update schedule collection in mongodb
    # db.schedule.delete_one({"_id": "schedule_2023"})
    # schedule = bbref.get_schedule(2023).to_dict(orient='index')
    # schedule.update({"_id": "schedule_2023"})
    # db.schedule.insert_one(schedule)
    print()