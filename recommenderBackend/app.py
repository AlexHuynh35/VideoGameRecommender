import psycopg2
from flask import Flask, jsonify
from flask_cors import CORS
from databaseController import DatabaseController

app = Flask(__name__)
CORS(app)

my_db = DatabaseController()

@app.route("/")
def home():
    return "Video Game Recommender"

@app.route("/games")
def get_games():
    conn = psycopg2.connect (
        dbname = my_db.dbname,
        user = my_db.user,
        password = my_db.password,
        host = my_db.host,
        port = my_db.port
    )
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, first_release_date, rating, cover_url FROM games LIMIT 10;")
    games = cursor.fetchall()
    game_list = []
    for game in games:
        game_list.append({
            "id": game[0], 
            "name": game[1],
            "first_release_date": game[2], 
            "rating": game[3], 
            "cover_url": game[4]
        })
    cursor.close()
    conn.close()
    return jsonify(game_list)

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)