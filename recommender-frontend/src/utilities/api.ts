export async function fetchGames() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test_return_filtered_game_list`);
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  return response.json();
}