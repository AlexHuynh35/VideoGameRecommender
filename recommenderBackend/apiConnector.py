import time
import random
import requests

class APIConnector:
    def __init__(self):
        self.client_id = input("Input the IGDB client ID: ")
        self.client_secret = input("Input the IGDB client secret: ")
        self.access_token = self.__get_access()

    def __get_access(self):
        auth_url = "https://id.twitch.tv/oauth2/token"
        params = {
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "grant_type": "client_credentials"
        }
        response = requests.post(auth_url, params = params)
        access_token = response.json()["access_token"]
        return access_token

    def get_games(self, offset, batch_size):
        headers = {
            "Client-ID": self.client_id,
            "Authorization": f"Bearer {self.access_token}"
        }
        query = f"""
                fields id, name, first_release_date, rating, cover.url, genres.id, genres.name, platforms.id, platforms.name, involved_companies.company.id, involved_companies.company.name;
                limit {batch_size}; offset {offset};
            """
        response = requests.post("https://api.igdb.com/v4/games/", headers = headers, data = query)
        return response.json()

    def get_random_subset(self, size):
        random_subset = []
        batch_size = 10
        for i in range(size // 10):
            offset = random.randint(0, 428000)
            games = self.get_games(offset, batch_size)
            random_subset.extend(games)
            time.sleep(0.2)
        print("Random subset retrieved!")
        return random_subset

    def get_all_games(self):
        all_games = []
        offset = 0
        batch_size = 500
        while True:
            games = self.get_games(offset, batch_size)
            if not games:
                break
            all_games.extend(games)
            offset += batch_size
            time.sleep(0.2)
        print("All games retrieved!")
        return all_games