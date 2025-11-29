import psycopg2
import utils.appHelperFunc as helper
from flask import Flask, jsonify, request
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

@app.route("/fetch_filtered_game_list", methods=["GET"])
def fetch_filtered_game_list():
    offset = request.args.get("offset", type=int)
    genres = request.args.get("genres", "", type=str)
    platforms = request.args.get("platforms", "", type=str)
    sort_type = request.args.get("sort", "name", type=str)
    genre_array = genres.split(",") if genres else []
    platform_array = platforms.split(",") if platforms else []
    genre_int_array = [int(x) for x in genre_array]
    platform_int_array = [int(x) for x in platform_array]

    conn = psycopg2.connect (
        dbname = app.config["DBNAME"],
        user = app.config["DBUSER"],
        password = app.config["DBPASS"],
        host = app.config["DBHOST"],
        port = app.config["DBPORT"]
    )
    cursor = conn.cursor()
    games = helper.retrieve_game_info_with_filters(cursor, genre_int_array, platform_int_array, sort_type, offset)
    game_list = helper.readable_game_list(games)
    cursor.close()
    conn.close()
    return jsonify(game_list)

@app.route("/fetch_filtered_game_list_size", methods=["GET"])
def fetch_filtered_game_list_size():
    genres = request.args.get("genres", "", type=str)
    platforms = request.args.get("platforms", "", type=str)
    genre_array = genres.split(",") if genres else []
    platform_array = platforms.split(",") if platforms else []
    genre_int_array = [int(x) for x in genre_array]
    platform_int_array = [int(x) for x in platform_array]

    conn = psycopg2.connect (
        dbname = app.config["DBNAME"],
        user = app.config["DBUSER"],
        password = app.config["DBPASS"],
        host = app.config["DBHOST"],
        port = app.config["DBPORT"]
    )
    cursor = conn.cursor()
    num_games = len(helper.retrieve_simplified_game_info_with_filters(cursor, genre_int_array, platform_int_array))
    cursor.close()
    conn.close()
    return jsonify(num_games)

@app.route("/fetch_game_tags")
def fetch_game_tags():
    conn = psycopg2.connect (
        dbname = app.config["DBNAME"],
        user = app.config["DBUSER"],
        password = app.config["DBPASS"],
        host = app.config["DBHOST"],
        port = app.config["DBPORT"]
    )
    cursor = conn.cursor()
    games = helper.retrieve_all_game_names(cursor)
    game_tags = helper.readable_tags(games)
    cursor.close()
    conn.close()
    return jsonify(game_tags)

@app.route("/fetch_genre_tags")
def fetch_genre_tags():
    conn = psycopg2.connect (
        dbname = app.config["DBNAME"],
        user = app.config["DBUSER"],
        password = app.config["DBPASS"],
        host = app.config["DBHOST"],
        port = app.config["DBPORT"]
    )
    cursor = conn.cursor()
    genres = helper.retrieve_all_genres(cursor)
    genre_tags = helper.readable_tags(genres)
    cursor.close()
    conn.close()
    return jsonify(genre_tags)

@app.route("/fetch_platform_tags")
def fetch_platform_tags():
    conn = psycopg2.connect (
        dbname = app.config["DBNAME"],
        user = app.config["DBUSER"],
        password = app.config["DBPASS"],
        host = app.config["DBHOST"],
        port = app.config["DBPORT"]
    )
    cursor = conn.cursor()
    platforms = helper.retrieve_all_platforms(cursor)
    platform_tags = helper.readable_tags(platforms)
    cursor.close()
    conn.close()
    return jsonify(platform_tags)

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)