from flask import Flask, jsonify
from db import db
import bbref_scripts as bbref
import pandas as pd
import constants
import json
import os


if __name__ == "__main__":
    print()
    
    # # Update leaderboards db with stat names
    # for x in db.leaderboards.find():
    #     db.leaderboards.update_one({"_id": x["_id"]}, {"$set": {"name": constants.leaderboard_full_names[f'leaders_{x["_id"]}']}})
    
    # # Insert roster document for each team
    # for x in db.rosters.find():
    #     for y in x:
    #         if y == "_id":
    #             continue
    #         db.rosters.insert_one({"_id": y, "roster": x[y]})

    # # Insert document for each game in schedule db
    # for x in db.schedule.find():
    #     for y in x:
    #         if y == "_id":
    #             continue
    #         db.schedule.insert_one({"_id": y, "schedule": x[y]})
    
    # # Insert document for each player in player_data db
    # for x in db.player_data.find():
    #     for y in x:
    #         if y == "_id":
    #             continue
    #         db.player_data.insert_one({"_id": y, "data": x[y]})
    
    
    # # Update rosters collections in mongodb
    # with open(f"backend//player_data//player_data.txt", "r") as f:
    #     player_data_dict = json.load(f)
    # db.player_data.insert_one(player_data_dict)
    # with open(f"backend//rosters//team_rosters.txt", "r") as f:
    #     team_roster_dict = json.load(f)
    # db.rosters.insert_one(team_roster_dict)


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
