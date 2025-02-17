def retrieve_game_info(cursor, numGames):
    cursor.execute("SELECT id, name, first_release_date, rating, cover_url FROM games LIMIT %s;", (numGames,))
    games = cursor.fetchall()
    return games

def readable_game_list(games):
    game_list = []
    for game in games:
        game_list.append({
            "id": game[0], 
            "name": game[1],
            "first_release_date": game[2], 
            "rating": game[3], 
            "cover_url": game[4]
        })
    return game_list
