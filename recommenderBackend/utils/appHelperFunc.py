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

    game_platform_query = """
    SELECT games.id AS game_id, ARRAY_AGG(platforms.name) AS platforms
    FROM games
    JOIN game_platforms ON games.id = game_platforms.game_id
    JOIN platforms ON game_platforms.platform_id = platforms.id
    WHERE games.id = ANY(%s)
    GROUP BY games.id, games.name;
    """
    cursor.execute(game_platform_query, (game_id_list,))
    platforms = cursor.fetchall()
    platform_dict = {row[0]: row[1] for row in platforms}

    game_company_query = """
    SELECT games.id AS game_id, ARRAY_AGG(companies.name) AS companies
    FROM games
    JOIN game_companies ON games.id = game_companies.game_id
    JOIN companies ON game_companies.company_id = companies.id
    WHERE games.id = ANY(%s)
    GROUP BY games.id, games.name;
    """
    cursor.execute(game_company_query, (game_id_list,))
    companies = cursor.fetchall()
    company_dict = {row[0]: row[1] for row in companies}

    games_with_all_info = []
    for game in games:
        game_genres = genre_dict.get(game[0], [])
        game_platforms = platform_dict.get(game[0], [])
        game_companies = company_dict.get(game[0], [])
        games_with_all_info.append(game + (game_genres, game_platforms, game_companies))
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
            "genres": game[5],
            "platforms": game[6],
            "companies": game[7]
        })
    return game_list
