import { useEffect, useState } from "react";
import { fetchGames } from "./services/api";
import BulletList from './utilsComp/BulletList.tsx'

type Game = {
  id: number;
  name: string;
  first_release_date: string;
  rating: number;
  cover_url: string;
  genres: string[];
  platforms: string[];
  companies: string[];
};

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGames()
      .then((data) => {
        console.log("Fetched data:", data);
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading games...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Game List</h1>
      <ul>
        {games.map((game) => {
          return (
            <div>
              <li key={game.id}>
                <img src={game.cover_url} alt={game.name} width="100" />
                <p>
                  <strong>{game.name}</strong> - Rating: {game.rating} - Released: {game.first_release_date}
                </p>
              </li>
              <BulletList listType="genres" list={game.genres} />
              <BulletList listType="platforms" list={game.platforms} />
              <BulletList listType="companies" list={game.companies} />
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
