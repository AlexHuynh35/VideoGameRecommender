export async function fetchGames(offset: number) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test_return_filtered_game_list/${offset}`);
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  return response.json();
}

export async function fetchAllGameNames() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test_full_game_list`);
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  return response.json();
}