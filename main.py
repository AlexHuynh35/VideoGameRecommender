from databaseController import DatabaseController
from apiConnector import APIConnector

def printGames(gamesJSON):
    for game in gamesJSON:
        print(f"Game: {game['name']}")
        print(f"Genres: {', '.join([g['name'] for g in game.get('genres', [])])}")
        print(f"Platforms: {', '.join([p['name'] for p in game.get('platforms', [])])}")
        print(f"Rating: {game.get('rating', 'N/A')}")
        print("-" * 40)

def main():
    myAPI = APIConnector()
    myDB = DatabaseController()
    userInput1 = input("Do you want to get data from IGDB for view the database? Answer get, view, or exit")
    while userInput1 != "exit":
        if userInput1 == "get":
            num = input("How many games do you want to get?")
            games = myAPI.getData(num)
            printGames(games)
            userInput2 = input("Do you want to store this game data in the database? Answer yes or no.")
            if userInput2 == "yes":
                myDB.storeToDatabase(games)
            else:
                print("Game data will not be stored!")
        else if userInput1 == "view":
            myDB.retrieveAndClearData()
        userInput1 = input("Do you want to get data from IGDB for view the database? Answer get, view, or exit")

main()