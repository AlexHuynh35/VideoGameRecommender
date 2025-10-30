from databaseController import DatabaseController
from apiConnector import APIConnector

load_dotenv()

app.config["DBNAME"] = os.getenv("DBNAME")
app.config["DBUSER"] = os.getenv("DBUSER")
app.config["DBPASS"] = os.getenv("DBPASS")
app.config["DBHOST"] = os.getenv("DBHOST")
app.config["DBPORT"] = os.getenv("DBPORT")

def fillDatabase():
    my_api = APIConnector()
    my_db = DatabaseController()
    all_games = my_api.get_random_subset(10000)
    my_db.store_to_database(all_games, [app.config["DBNAME"], app.config["DBUSER"], app.config["DBPASS"], app.config["DBHOST"], app.config["DBPORT"]])

fillDatabase()