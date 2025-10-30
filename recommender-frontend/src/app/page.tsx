"use client"

import { useEffect, useState } from "react";
import { GameGallery } from "@/components";
import { fetchGames } from "@/utilities/api";
import { placeholder, Game } from "@/test-data/test-data";

export default function Home() {
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
    <section className="p-6">
      <div className="max-w-7xl mx-auto my-12 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-7xl xl:text-8xl font-bold font-orbitron text-cyan-500">
          Video Game
        </h1>
        <h1 className="text-4xl sm:text-6xl md:text-8xl xl:text-9xl font-bold font-orbitron text-cyan-500">
          Recommender
        </h1>
      </div>
      
      <GameGallery gameList={games} />
    </section>
  );
}
