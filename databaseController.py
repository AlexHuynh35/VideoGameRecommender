import psycopg2

class DatabaseController:
    def __init__(self):
        self.dbname, self.user, self.password, self.host, self.port = self.__retrieveDatabaseInfo()

    def __retrieveDatabaseInfo(self):
        dbname = input("Input the name of the database: ")
        user = input("Input the username: ")
        password = input("Input the password: ")
        host = "localhost"
        port = "5432"
        return dbname, user, password, host, port

    def storeToDatabase(self, gamesJSON):
        conn = psycopg2.connect(
            dbname = self.dbname,
            user = self.user,
            password = self.password,
            host = self.host,
            port = self.port
        )
        cursor = conn.cursor()
        for game in gamesJSON:
            cursor.execute("""
                INSERT INTO games (name, rating, platforms, genres)
                VALUES (%s, %s, %s, %s)
            """, (
                game["name"],
                game.get("rating", None),
                ", ".join([p["name"] for p in game.get("platforms", [])]),
                ", ".join([g["name"] for g in game.get("genres", [])])
            ))
        conn.commit()
        cursor.close()
        conn.close()
        print("Data stored to PostgreSQL!")

    def __retrieveData(self, numGames):
        cursor.execute("SELECT * FROM games LIMIT " + numGames + ";")
        rows = cursor.fetchall()
        for row in rows:
            print(row)
        print("Here is the data you requested!")

    def __clearDatabase(self):
        cursor.execute("TRUNCATE TABLE games RESTART IDENTITY CASCADE;")
        conn.commit()
        print("Database has been cleared!")

    def retrieveAndClearData(self):
        conn = psycopg2.connect(
            dbname = self.dbname,
            user = self.user,
            password = self.password,
            host = self.host,
            port = self.port
        )
        cursor = conn.cursor()
        userInput = input("Do you want to retrieve, clear, or exit?")
        while userInput != "exit":
            if userInput == "retrieve":
                numGames = input("How many game data do you want to retrieve?")
                try:
                    self.__retrieveData(numGames)
                except:
                    print("You did not enter a valid number!")
            else if userInput == "clear":
                self.__clearDatabase()
            userInput = input("Do you want to retrieve, clear, or exit?")
        cursor.close()
        conn.close()
        print("Control of database ended!")
