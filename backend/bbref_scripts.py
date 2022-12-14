from bs4 import BeautifulSoup
import requests
import pandas as pd
import constants
import json


# Function to scrape rosters for specified team
def get_team_roster(team_code, season):
    url = f"https://www.basketball-reference.com/teams/{team_code}/{season}.html"
    soup = BeautifulSoup(requests.get(url).content, 'html5lib')
    
    with open(f"backend//player_data//player_data.txt", "r") as f:
        player_data_dict = json.load(f)
    with open(f"backend//rosters//team_rosters.txt", "r") as f:
        team_roster_dict = json.load(f)
    
    team_roster_list = []
    team_roster = soup.find_all("table", {"id": "roster"})[0].contents[7].contents
    for player in team_roster:
        if isinstance(player, str):
            continue
        
        player_data = [] 
        for i in [1, 2, 3, 4]:
            if i == 1:
                try:
                    player_id = player.contents[i].contents[0].attrs['href'].split('/')[3].split('.html')[0]
                    team_roster_list.append(player_id)
                    player_data.append(player_id)
                except:
                    team_roster_list.append('NA')
                    player_data.append('NA')
                try:
                    player_data.append(player.contents[i].contents[0].contents[0])
                except:
                    player_data.append('NA')
                try:
                    player_data.append(player.contents[0].contents[0])
                except:
                    player_data.append('NA')
                try:
                    player_url = player.contents[i].contents[0].attrs['href']
                    player_data.append(player_url)
                except:
                    player_data.append('NA')
                try:
                    player_data.append(get_player_pic(player_url))
                except:
                    player_data.append('NA')
            elif i == 2:
                try:
                    pos = player.contents[i].contents[0]
                    if "-" in pos:
                        pos = pos.split("-")[0]
                    elif pos in ['PG', 'SG']:
                        pos = 'G'
                    elif pos in ['F', 'SF', 'PF']:
                        pos = 'F'
                    player_data.append(pos)
                except:
                    player_data.append('NA')
            else:
                try:
                    player_data.append(player.contents[i].contents[0])
                except:
                    player_data.append('NA')
                    
        player_data_dict[player_id] = player_data
    
    team_roster_dict[team_code] = team_roster_list
    with open(f"backend//player_data//player_data.txt", "w") as f:
        f.write(json.dumps(player_data_dict))
    with open(f"backend//rosters//team_rosters.txt", "w") as f:
        f.write(json.dumps(team_roster_dict))


# Return player headshot url
def get_player_pic(url):
    url = f"https://www.basketball-reference.com{url}"
    soup = BeautifulSoup(requests.get(url).content, 'html5lib')
    return(soup.find_all("div", {"class": "media-item"})[0].contents[0].attrs['src'])


# Get leaderboards for specific stat and year
def get_leaderboards(stat, season):
    url = f"https://www.basketball-reference.com/leagues/NBA_{season}_leaders.html"
    soup = BeautifulSoup(requests.get(url).content, 'html5lib')
    
    stat_leaderboard = []
    leaders = soup.find_all("div", {"id": stat})[0].contents[1].contents[3].contents
    rank = 1
    for player in leaders:
        if isinstance(player, str):
            continue
        
        player_data = []
        player_data.append(rank)
        for i in [3, 5]:
            try:
                if i == 3:
                    player_data.append(player.contents[i].contents[0].attrs['href'].split('/')[3].split('.html')[0])
                else:
                    player_data.append(float(player.contents[i].contents[0]))
            except:
                player_data.append('NA')
        
        stat_leaderboard.append(player_data)
        rank += 1
    cols = ['rank','player_id','value']
    leaderboard_df = pd.DataFrame(stat_leaderboard, columns=cols)
    leaderboard_df.set_index('rank', inplace=True)
    return(leaderboard_df)
    

# Function to scrape season schedule
#    - Returns a dataframe with the following contents:
#        - game_code: follows the syntax {Home Code}-{Away Code}-{MonthDayYear} ex: "HOU-LAC-11062000"
#        - game_date: date of game in the format Month-Day-Year ex: "11-06-2000"
#        - game_time  time of game in the format "10:30p"
#        - home_code: three character team code
#        - home_name: string containing official team name
#        - home_link: url to basketball-ref home team page
#        - away_code: three character team code
#        - away_name: string containing official team name
#        - away_link: url to basketball-ref away team page
#        - arena:     name of home team's arena
def get_schedule(season):
    schedule = []
    for month in ['october','november','december','january','february','march','april']:
        url = f"https://www.basketball-reference.com/leagues/NBA_{season}_games-{month}.html"
        soup = BeautifulSoup(requests.get(url).content, 'html5lib')
        
        schedule_html = soup.find_all("table", {"id":"schedule"})[0].contents[7].contents
        for game in schedule_html:
            if isinstance(game, str):
                continue
            
            game_data = []
            
            away_url = game.contents[2].contents[0].attrs['href']
            away_code = away_url.split('/')[2]
            
            home_url = game.contents[4].contents[0].attrs['href']
            home_code = home_url.split('/')[2]
            
            date = game.contents[0].contents[0].attrs['href'].split('&')
            date_code = ""
            date_str = ""
            for idx, i in enumerate(date):
                if idx != 2:
                    date_code += i[-2:]
                    date_str += f"{i[-2:]}-"
                else:
                    date_code += i[-4:]
                    date_str += i[-4:]
            
            game_code = f"{home_code}-{away_code}-{date_code}"
            if '=' in game_code:
                game_code = game_code.replace('=','0')
            
            game_data.append(game_code)
            game_data.append(date_str),
            game_data.append(game.contents[1].contents[0])
            game_data.append(home_code)
            game_data.append(game.contents[4].contents[0].contents[0])
            game_data.append(home_url)
            game_data.append(away_code)
            game_data.append(game.contents[2].contents[0].contents[0])
            game_data.append(away_url)            
            game_data.append(game.contents[9].contents[0])
            
            schedule.append(game_data)
            
    cols = ['game_code','game_date','game_time','home_code','home_name','home_link','away_code','away_name','away_link','arena']
    schedule_df = pd.DataFrame(schedule, columns=cols)
    schedule_df.set_index('game_code', inplace=True)
    return(schedule_df)


if __name__ == "__main__":
    # Loop over all teams and get rosters
    # for team in constants.team_codes:
    for team in ['BKN','CHA','CHI','CLE']:
        get_team_roster(team, 2023)
        print(f"Finished {team}")
    
    # # Get leaderboards for all stats
    # for stat in constants.leaderboard_names:
    #     leaderboard = get_leaderboards(stat, 2022)
    #     stat_name = stat.replace('leaders_', '')
    #     leaderboard.to_csv(f"data\\leaderboards\\{stat_name}_2022.csv")

    # schedule = get_schedule(2023)
    # schedule.to_csv(f"data\\schedule\\2023_schedule.csv")
    
    # leaderboard = get_schedule(2023)
