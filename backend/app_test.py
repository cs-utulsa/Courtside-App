import unittest
from app import app

class TestGetSchedule(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_get_schedule_valid_date(self):
        response = self.app.get('/schedule/10/31')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'application/json')
        expected_response = [
            {
                "arena":"Spectrum Center",
                "away_code":"SAS",
                "away_link":"/teams/SAS/2023.html",
                "away_name":"San Antonio Spurs",
                "game_date":"=2-15-2023",
                "game_time":"7:00p",
                "home_code":"CHA",
                "home_link":"/teams/CHO/2023.html",
                "home_name":"Charlotte Hornets"
            },
            {
                "arena":"Gainbridge Fieldhouse",
                "away_code":"CHI",
                "away_link":"/teams/CHI/2023.html",
                "away_name":"Chicago Bulls",
                "game_date":"=2-15-2023",
                "game_time":"7:00p",
                "home_code":"IND",
                "home_link":"/teams/IND/2023.html",
                "home_name":"Indiana Pacers"
            },
            {
                "arena":"Wells Fargo Center",
                "away_code":"CLE",
                "away_link":"/teams/CLE/2023.html",
                "away_name":"Cleveland Cavaliers",
                "game_date":"=2-15-2023",
                "game_time":"7:00p",
                "home_code":"PHI",
                "home_link":"/teams/PHI/2023.html",
                "home_name":"Philadelphia 76ers"
            },
        ]
        self.assertListEqual(response.json, expected_response)

    def test_get_schedule_invalid_date(self):
        response = self.app.get('/schedule/2/29')
        self.assertEqual(response.status_code, 400)


import unittest
from app import app

class TestGetPlayerData(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_get_player_data_valid_id(self):
        response = self.app.get('/player/1628983')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'application/json')
        expected_response = {
            "_id": 1628983, 
            "name": "Shai Gilgeous-Alexander", 
            "age": "24 years", 
            "country": "Canada", 
            "draft": "2018 R1 Pick 11", 
            "experience": "4 Years", 
            "headshot": "https://cdn.nba.com/headshots/nba/latest/1040x760/1628983.png", 
            "height": "6'6\"", 
            "number": 2, 
            "position": "Guard", 
            "team": "Oklahoma City Thunder", 
            "weight": "195lb"
        }
        self.assertDictEqual(response.json, expected_response)

    def test_get_player_data_invalid_id(self):
        response = self.app.get('/player/999')
        self.assertEqual(response.status_code, 404)
