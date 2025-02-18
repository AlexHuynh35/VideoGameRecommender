def retrieve_game_info(cursor, numGames):
    game_info_query = "SELECT id, name, first_release_date, rating, cover_url FROM games LIMIT %s;"
    cursor.execute(game_info_query, (numGames,))
    games = cursor.fetchall()
    game_id_list = [game[0] for game in games]
    game_genre_query = """
    SELECT games.id AS game_id, ARRAY_AGG(genres.name) AS genres
    FROM games
    JOIN game_genres ON games.id = game_genres.game_id
    JOIN genres ON game_genres.genre_id = genres.id
    WHERE games.id = ANY(%s)
    GROUP BY games.id, games.name;
    """
    cursor.execute(game_genre_query, (game_id_list,))
    genres = cursor.fetchall()
    genre_dict = {row[0]: row[1] for row in genres}
    games_with_all_info = []
    for game in games:
        game_genres = genre_dict.get(game[0], [])
        games_with_all_info.append(game + (game_genres,))
    return games_with_all_info

def readable_game_list(games):
    game_list = []
    for game in games:
        game_list.append({
            "id": game[0], 
            "name": game[1],
            "first_release_date": game[2], 
            "rating": game[3], 
            "cover_url": game[4],
            "genre": game[5]
        })
    return game_list
