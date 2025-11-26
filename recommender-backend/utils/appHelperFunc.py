def retrieve_game_info(cursor, games):
    game_id_list = [games[0] for game in games]

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

def retrieve_game_info_with_filters(cursor, genres, platforms, page):
    params = []
    where_clauses = []

    if genres:
        placeholders = ','.join(['%s'] * len(genres))
        where_clauses.append(f"ga.id IN (SELECT game_id FROM game_genres WHERE genre_id IN ({placeholders}))")
        params.extend(genres)

    if platforms:
        placeholders = ','.join(['%s'] * len(platforms))
        where_clauses.append(f"ga.id IN (SELECT game_id FROM game_platforms WHERE platform_id IN ({placeholders}))")
        params.extend(platforms)

    where_sql = ""
    if where_clauses:
        where_sql = "WHERE " + " AND ".join(where_clauses)

    query = f"""
    SELECT
        ga.id,
        ga.name,
        ga.first_release_date,
        ga.rating,
        ga.cover_url,
        ARRAY_AGG(DISTINCT ge.name) AS genres,
        ARRAY_AGG(DISTINCT pl.name) AS platforms,
        ARRAY_AGG(DISTINCT co.name) AS companies
    FROM games AS ga
    LEFT JOIN game_genres AS gg ON ga.id = gg.game_id
    LEFT JOIN genres AS ge ON gg.genre_id = ge.id
    LEFT JOIN game_platforms AS gp ON ga.id = gp.game_id
    LEFT JOIN platforms AS pl ON gp.platform_id = pl.id
    LEFT JOIN game_companies AS gc ON ga.id = gc.game_id
    LEFT JOIN companies AS co ON gc.company_id = co.id
    {where_sql}
    GROUP BY ga.id
    LIMIT 96
    OFFSET %s;
    """

    params.append(page * 96)

    cursor.execute(query, tuple(params))
    return cursor.fetchall()

def readable_game_list(games):
    game_list = []
    for game in games:
        game_list.append({
            "id": game[0], 
            "name": game[1],
            "firstReleaseDate": game[2], 
            "rating": game[3], 
            "coverUrl": game[4],
            "genres": game[5],
            "platforms": game[6],
            "companies": game[7]
        })
    return game_list

def retrieve_certain_number_of_games(cursor, number):
    game_info_query = "SELECT id, name, first_release_date, rating, cover_url FROM games LIMIT %s;"
    cursor.execute(game_info_query, (number,))
    games = cursor.fetchall()
    return retrieve_game_info(games)

def retrieve_all_game_names(cursor):
    game_info_query = "SELECT id, name FROM games;"
    cursor.execute(game_info_query)
    games = cursor.fetchall()
    return games

def retrieve_all_genres(cursor):
    genre_info_query = "SELECT id, name FROM genres;"
    cursor.execute(genre_info_query)
    genres = cursor.fetchall()
    return genres

def retrieve_all_platforms(cursor):
    platform_info_query = "SELECT id, name FROM platforms;"
    cursor.execute(platform_info_query)
    platforms = cursor.fetchall()
    return platforms

def readable_tags(tags):
    updated_tags = []
    for tag in tags:
        updated_tags.append({
            "id": tag[0], 
            "name": tag[1]
        })
    return updated_tags
