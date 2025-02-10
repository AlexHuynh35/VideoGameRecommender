from databaseController import DatabaseController
from apiConnector import APIConnector

def fillDatabase():
    my_api = APIConnector()
    my_db = DatabaseController()
    all_games = my_api.get_random_subset(10000)
    my_db.store_to_database(all_games)

fillDatabase()