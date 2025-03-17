import { useEffect, useState } from "react";
import { fetchGames } from "./services/api";
import BulletList from './utilsComp/BulletList.tsx'
import GameTitle from './utilsComp/GameTitle.tsx'

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
    <div className="flex flex-col justify-center items-center">
      <div>
        <h1>Game List</h1>
      </div>
      <div>
        <div className="grid grid-cols-1 gap-4">
          {games.map((game) => {
            return (
              <div className="flex bg-gray-200 rounded-xl outline-solid outline-4 outline-cyan-200 p-4" key={game.id}>
                <div className="flex justify-center w-50 flex-none">
                  <div className="pr-4">
                    <img src={game.cover_url} alt={game.name} width="200" />
                  </div>
                </div>
                <div className="w-100 flex-none">
                  <GameTitle name={game.name} first_release_date={game.first_release_date} rating={game.rating} />
                  <div className="grid grid-cols-3 gap-3 pt-4">
                    <BulletList listType="Genres" list={game.genres} />
                    <BulletList listType="Platforms" list={game.platforms} />
                    <BulletList listType="Companies" list={game.companies} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
