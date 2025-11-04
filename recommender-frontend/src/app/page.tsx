"use client"

import { useEffect, useState } from "react";
import { GameGallery } from "@/components";
import { fetchGames } from "@/utilities/api";
import { Game } from "@/test-data/test-data";

const gamesPerPage = 24;
const pageNumbers = [1, 2, 3, 4];

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [paginatedGames, setPaginatedGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGames().then((data) => {
      setGames(data);
      setCurrentPage(1);
      setPaginatedGames(data.slice(0, gamesPerPage));
      setLoading(false);
    }).catch((err) => {
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

      <div className="flex justify-center gap-8">
        {pageNumbers.map((page) => (
          <div key={page} className="relative w-12 h-12">
            <div className="absolute inset-0 bg-orange-500 -m-[5px]" />
            <div
              className={`absolute inset-0 flex items-center justify-center text-black font-rajdhani font-semibold transform -translate-y-1 transition-transform active:translate-y-0 transition cursor-pointer ${page === currentPage ? "bg-orange-400" : "bg-neutral-200"}`}
              onClick={() => {
                setCurrentPage(page);
                setPaginatedGames(games.slice((page - 1) * gamesPerPage, page * gamesPerPage));
              }}
            >
              {page}
            </div>
          </div>
        ))}
      </div>

      <GameGallery gameList={paginatedGames} />
    </section>
  );
}
