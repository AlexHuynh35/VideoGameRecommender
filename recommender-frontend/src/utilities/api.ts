export async function fetchGames(offset: number) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test_return_filtered_game_list/${offset}`);
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  return response.json();
}

export async function fetchAllGameNames() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch_game_tags`);
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  return response.json();
}

export async function fetchAllGenres() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch_genre_tags`);
  if (!response.ok) {
    throw new Error("Failed to fetch genres");
  }
  return response.json();
}

export async function fetchAllPlatforms() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch_platform_tags`);
  if (!response.ok) {
    throw new Error("Failed to fetch platforms");
  }
  return response.json();
}