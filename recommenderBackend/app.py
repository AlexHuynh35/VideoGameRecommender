import psycopg2
import utils.appHelperFunc as helper
from flask import Flask, jsonify
from flask_cors import CORS
from utils.databaseController import DatabaseController

app = Flask(__name__)
CORS(app)

my_db = DatabaseController()

@app.route("/test_app")
def test_app():
    return "Video Game Recommender"

@app.route("/test_return_ten_games")
def test_return_ten_games():
    conn = psycopg2.connect (
        dbname = my_db.dbname,
        user = my_db.user,
        password = my_db.password,
        host = my_db.host,
        port = my_db.port
    )
    cursor = conn.cursor()
    games = helper.retrieve_game_info(cursor, 10)
    game_list = helper.readable_game_list(games)
    cursor.close()
    conn.close()
    return jsonify(game_list)

@app.route("/test_full_game_item")
def test_full_game_item():
    return "Video Game Recommender"

@app.route("/test_full_game_list")
def test_full_game_list():
    return "Video Game Recommender"

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)