import time
import requests
import psycopg2
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from utils import apiConnector
from utils import databaseController

def test_igdb_api():
    my_api = apiConnector.APIConnector()
    headers = {
        "Client-ID": my_api.client_id,
        "Authorization": f"Bearer {my_api.access_token}"
    }
    query = 'fields name, rating; where rating > 80; limit 100;'
    timing = []
    timing_with_delay = []
    for i in range(10):
        start = time.perf_counter()
        response = requests.post("https://api.igdb.com/v4/games/", headers = headers, data = query)
        end1 = time.perf_counter()
        time.sleep(0.2)
        end2 = time.perf_counter()
        timing.append(end1 - start)
        timing_with_delay.append(end2 - start)
    return (timing, timing_with_delay)

def test_game_db():
    my_db = databaseController.DatabaseController()
    conn = psycopg2.connect(
        dbname = my_db.dbname,
        user = my_db.user,
        password = my_db.password,
        host = my_db.host,
        port = my_db.port
    )
    cursor = conn.cursor()
    timing = []
    for i in range(10):
        start = time.perf_counter()
        cursor.execute("SELECT name, rating FROM games WHERE rating > 80 LIMIT 100;")
        cursor.fetchall()
        end = time.perf_counter()
        timing.append(end - start)
    return timing

igdb_timing, igdb_timing_with_delay = test_igdb_api()
db_timing = test_game_db()
avg_igdb_timing = sum(igdb_timing)/10
avg_igdb_timing_with_delay = sum(igdb_timing_with_delay)/10
avg_db_timing = sum(db_timing)/10
print("Averages: ", avg_igdb_timing, avg_igdb_timing_with_delay, avg_db_timing)
print("Improvement: ", (avg_igdb_timing - avg_db_timing)/avg_igdb_timing)
print("Improvement with delay: ", (avg_igdb_timing_with_delay - avg_db_timing)/avg_igdb_timing_with_delay)
