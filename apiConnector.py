import requests

class APIConnector:
    def __init__(self):
        self.client_id = input("Input the IGDB client ID: ")
        self.client_secret = input("Input the IGDB client secret: ")
        self.access_token = self.__getAccess()

    def __getAccess(self):
        auth_url = "https://id.twitch.tv/oauth2/token"
        params = {
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "grant_type": "client_credentials"
        }
        response = requests.post(auth_url, params = params)
        access_token = response.json()["access_token"]
        return access_token

    def getData(self, number)
        headers = {
            "Client-ID": self.client_id,
            "Authorization": f"Bearer {self.access_token}"
        }
        query = ["fields name, genres.name, platforms.name, first_release_date, rating, cover.url;",
            "limit" + number + ";",
            "sort rating desc;"
        ]
        response = requests.post("https://api.igdb.com/v4/games/", headers = headers, data = " ".join(query))
        games = response.json()
        return games
