import psycopg2
import utils.appHelperFunc as helper
from flask import Flask, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)

app.config["DBNAME"] = os.getenv("DBNAME")
app.config["DBUSER"] = os.getenv("DBUSER")
app.config["DBPASS"] = os.getenv("DBPASS")
app.config["DBHOST"] = os.getenv("DBHOST")
app.config["DBPORT"] = os.getenv("DBPORT")

@app.route("/test_app")
def test_app():
    return "Video Game Recommender"

@app.route("/test_return_ten_games")
def test_return_ten_games():
    conn = psycopg2.connect (
        dbname = app.config["DBNAME"],
        user = app.config["DBUSER"],
        password = app.config["DBPASS"],
        host = app.config["DBHOST"],
        port = app.config["DBPORT"]
    )
    cursor = conn.cursor()
    games = helper.retrieve_certain_number_of_games(cursor, 10)
    game_list = helper.readable_game_list(games)
    cursor.close()
    conn.close()
    return jsonify(game_list)

@app.route("/test_return_filtered_game_list/<int:offset>", methods=["GET"])
def test_full_game_item(offset):
    conn = psycopg2.connect (
        dbname = app.config["DBNAME"],
        user = app.config["DBUSER"],
        password = app.config["DBPASS"],
        host = app.config["DBHOST"],
        port = app.config["DBPORT"]
    )
    cursor = conn.cursor()
    games = helper.retrieve_game_info_with_filters(cursor, [31, 13, 14], [130, 167], offset)
    game_list = helper.readable_game_list(games)
    cursor.close()
    conn.close()
    return jsonify(game_list)

@app.route("/test_full_game_list")
def test_full_game_list():
    conn = psycopg2.connect (
        dbname = app.config["DBNAME"],
        user = app.config["DBUSER"],
        password = app.config["DBPASS"],
        host = app.config["DBHOST"],
        port = app.config["DBPORT"]
    )
    cursor = conn.cursor()
    games = helper.retrieve_all_game_names(cursor)
    game_tags = helper.readable_game_tags(games)
    cursor.close()
    conn.close()
    return jsonify(game_tags)

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)