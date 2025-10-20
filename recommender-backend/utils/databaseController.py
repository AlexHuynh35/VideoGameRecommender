import psycopg2

class DatabaseController:
    def __init__(self):
        self.dbname, self.user, self.password, self.host, self.port = self.__retrieve_database_info()

    def __retrieve_database_info(self):
        info = input("Input the name of the database, the username, and the password: ").split(" ")
        dbname = info[0]
        user = info[1]
        password = info[2]
        host = "localhost"
        port = "5432"
        return dbname, user, password, host, port

    def get_or_insert(self, cursor, table, id_column, name_column, record_id, record_name):
        cursor.execute(f"SELECT id FROM {table} WHERE {id_column} = %s;", (record_id,))
        result = cursor.fetchone()
        if result:
            return result[0]
        cursor.execute(f"INSERT INTO {table} ({id_column}, {name_column}) VALUES (%s, %s) RETURNING id;", (record_id, record_name))
        return cursor.fetchone()[0]

    def store_to_database(self, games_json):
        conn = psycopg2.connect(
            dbname = self.dbname,
            user = self.user,
            password = self.password,
            host = self.host,
            port = self.port
        )
        cursor = conn.cursor()
        for game in games_json:
            game_id = game["id"]
            name = game.get("name")
            release_date = game.get("first_release_date")
            rating = game.get("rating")
            cover_url = game.get("cover", {}).get("url")
            cursor.execute(
                "INSERT INTO games (id, name, first_release_date, rating, cover_url) VALUES (%s, %s, to_timestamp(%s), %s, %s) ON CONFLICT (id) DO NOTHING;",
                (game_id, name, release_date, rating, cover_url)
            )
            for genre in game.get("genres", []):
                genre_id = genre["id"]
                genre_name = genre["name"]
                self.get_or_insert(cursor, "genres", "id", "name", genre_id, genre_name)
                cursor.execute("INSERT INTO game_genres (game_id, genre_id) VALUES (%s, %s) ON CONFLICT DO NOTHING;", (game_id, genre_id))
            for platform in game.get("platforms", []):
                platform_id = platform["id"]
                platform_name = platform["name"]
                self.get_or_insert(cursor, "platforms", "id", "name", platform_id, platform_name)
                cursor.execute("INSERT INTO game_platforms (game_id, platform_id) VALUES (%s, %s) ON CONFLICT DO NOTHING;", (game_id, platform_id))
            for company_data in game.get("involved_companies", []):
                company_id = company_data["company"]["id"]
                company_name = company_data["company"]["name"]
                self.get_or_insert(cursor, "companies", "id", "name", company_id, company_name)
                cursor.execute("INSERT INTO game_companies (game_id, company_id) VALUES (%s, %s) ON CONFLICT DO NOTHING;", (game_id, company_id))
        conn.commit()
        cursor.close()
        conn.close()
        print("Data inserted successfully!")
