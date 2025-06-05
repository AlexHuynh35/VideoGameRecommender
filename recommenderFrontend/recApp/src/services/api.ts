export const API_URL = "http://127.0.0.1:5000";

export async function fetchGames() {
  const response = await fetch(`${API_URL}/test_return_filtered_game_list`);
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  return response.json();
}