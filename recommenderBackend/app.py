import psycopg2
from flask import Flask, jsonify
from databaseController import DatabaseController

app = Flask(__name__)

my_db = DatabaseController()
conn = psycopg2.connect (
    dbname = my_db.dbname,
    user = my_db.user,
    password = my_db.password,
    host = my_db.host,
    port = my_db.port
)
cursor = conn.cursor()

@app.route("/")
def home():
    return "Video Game Recommender"

@app.route("/games")
def get_games():
    cursor.execute("SELECT name, rating FROM games LIMIT 10;")
    games = cursor.fetchall()
    return jsonify(games)

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)