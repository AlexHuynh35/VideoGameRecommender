"use client"

import { useEffect, useState } from "react";
import { GameGallery, SearchBar, FilterDropdown, SortDropdown } from "@/components";
import { fetchGames } from "@/utilities/api";
import { Game } from "@/test-data/test-data";

const gamesPerPage = 24;
const batchSize = gamesPerPage * 4;
const pageNumbers = [1, 2, 3, 4];

interface Tag {
  id: number;
  name: string;
}

interface Query {
  games: Tag[];
  genres: Tag[];
  platforms: Tag[];
  sortType: string;
  totalOffsets: number;
}

export default function Home() {
  const [currentQuery, setCurrentQuery] = useState<Query>({
    games: [],
    genres: [],
    platforms: [],
    sortType: "name",
    totalOffsets: 0
  });
  const [isReset, setIsReset] = useState<boolean>(false);
  const [currentOffset, setCurrentOffset] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [games, setGames] = useState<Game[]>([]);
  const [paginatedGames, setPaginatedGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGames(currentQuery.totalOffsets, currentQuery.genres.map(genre => genre.id), currentQuery.platforms.map(platform => platform.id), currentQuery.sortType).then((data) => {
      if (isReset) {
        setGames(data);
        setIsReset(false);
      } else {
        setGames(games.concat(data));
      }
      setCurrentPage(1);
      setPaginatedGames(data.slice(0, gamesPerPage));
      setLoading(false);
    }).catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }, [currentQuery]);

  const resetQuery = () => {
    setLoading(true);
    setIsReset(true);
    setCurrentOffset(0);
  }

  const setCurrentSearches = (newSearches: Tag[]) => {
    resetQuery();
    setCurrentQuery({
      games: newSearches,
      genres: currentQuery.genres,
      platforms: currentQuery.platforms,
      sortType: currentQuery.sortType,
      totalOffsets: 0
    });
  }

  const setCurrentGenres = (newGenres: Tag[]) => {
    resetQuery();
    setCurrentQuery({
      games: currentQuery.games,
      genres: newGenres,
      platforms: currentQuery.platforms,
      sortType: currentQuery.sortType,
      totalOffsets: 0
    })
  }

  const setCurrentPlatforms = (newPlatforms: Tag[]) => {
    resetQuery();
    setCurrentQuery({
      games: currentQuery.games,
      genres: currentQuery.genres,
      platforms: newPlatforms,
      sortType: currentQuery.sortType,
      totalOffsets: 0
    })
  }

  const setCurrentSortType = (newSortType: string) => {
    resetQuery();
    setCurrentQuery({
      games: currentQuery.games,
      genres: currentQuery.genres,
      platforms: currentQuery.platforms,
      sortType: newSortType,
      totalOffsets: 0
    })
  }

  const setTotalOffsets = (offset: number) => {
    setLoading(true);
    setCurrentQuery({
      games: currentQuery.games,
      genres: currentQuery.genres,
      platforms: currentQuery.platforms,
      sortType: currentQuery.sortType,
      totalOffsets: offset
    })
  }

  return (
    <section>
      <nav className="fixed top-0 left-0 right-0 p-4 bg-neutral-800 border-b-8 border-neutral-900 z-20">
        <div className="max-w-8xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="z-30">
            <SearchBar onSearchSubmit={setCurrentSearches} />
          </div>
          <div className="flex flex-row gap-4">
            <FilterDropdown filterType="genre" onFilterSubmit={setCurrentGenres} />
            <FilterDropdown filterType="platform" onFilterSubmit={setCurrentPlatforms} />
            <SortDropdown onSortSubmit={setCurrentSortType}/>
          </div>
        </div>
      </nav>

      <div className="p-6 pt-44 md:pt-24">
        <div className="max-w-7xl mx-auto my-12 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-7xl xl:text-8xl font-bold font-orbitron text-cyan-500">
            Video Game
          </h1>
          <h1 className="text-4xl sm:text-6xl md:text-8xl xl:text-9xl font-bold font-orbitron text-cyan-500">
            Recommender
          </h1>

          {currentQuery.games.length != 0 && (
            <div className="text-lg sm:text-2xl md:text-4xl xl:text-5xl font-bold font-rajdhani text-orange-500 pt-8">
              Here are games similar to {currentQuery.games.map(tag => tag.name).join(", ")}, filtered for the genres {currentQuery.genres.map(tag => tag.name).join(", ")} and the platforms {currentQuery.platforms.map(tag => tag.name).join(", ")}, sorted by {currentQuery.sortType}!
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-8">
          {currentOffset > 0 ? (
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 bg-neutral-700 -m-[5px]" />
              <div
                className="absolute inset-0 flex items-center justify-center text-black font-rajdhani font-semibold transform -translate-y-1 transition-transform active:translate-y-0 transition cursor-pointer bg-neutral-200"
                onClick={() => {
                  setCurrentPage(4);
                  setPaginatedGames(games.slice((currentOffset - 1) * batchSize + 3 * gamesPerPage, (currentOffset - 1) * batchSize + 4 * gamesPerPage));
                  setCurrentOffset(currentOffset - 1);
                }}
              >
                &lt;
              </div>
            </div>
          ) : (
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 bg-neutral-700 -m-[5px]" />
              <div className="absolute inset-0 flex items-center justify-center text-white font-rajdhani font-semibold transform -translate-y-1 transition-transform active:translate-y-0 transition cursor-pointer bg-neutral-600">
                &lt;
              </div>
            </div>
          )}

          {pageNumbers.map((page) => (
            <div key={page} className="relative w-12 h-12">
              <div className="absolute inset-0 bg-neutral-700 -m-[5px]" />
              <div
                className={`absolute inset-0 flex items-center justify-center font-rajdhani font-semibold transform -translate-y-1 transition-transform active:translate-y-0 transition cursor-pointer ${page === currentPage ? "bg-neutral-600 text-white" : "bg-neutral-200 text-black"}`}
                onClick={() => {
                  setCurrentPage(page);
                  setPaginatedGames(games.slice(currentOffset * batchSize + (page - 1) * gamesPerPage, currentOffset * batchSize + page * gamesPerPage));
                }}
              >
                {page + currentOffset * 4}
              </div>
            </div>
          ))}

          <div className="relative w-14 h-14">
            <div className="absolute inset-0 bg-neutral-700 -m-[5px]" />
            <div
              className="absolute inset-0 flex items-center justify-center text-black font-rajdhani font-semibold transform -translate-y-1 transition-transform active:translate-y-0 transition cursor-pointer bg-neutral-200"
              onClick={() => {
                currentOffset === currentQuery.totalOffsets ? (
                  setLoading(true),
                  setTotalOffsets(currentQuery.totalOffsets + 1),
                  setCurrentOffset(currentOffset + 1)
                ) : (
                  setCurrentPage(1),
                  setPaginatedGames(games.slice((currentOffset + 1) * batchSize, (currentOffset + 1) * batchSize + gamesPerPage)),
                  setCurrentOffset(currentOffset + 1)
                );
              }}
            >
              &gt;
            </div>
          </div>
        </div>

        {loading ? (
          <div className="max-w-7xl mx-auto my-12 text-center">
            <h1 className="text-xl font-bold font-rajdhani text-cyan-500">
              Loading games...
            </h1>
          </div>
        ) : error ? (
          <div className="max-w-7xl mx-auto my-12 text-center">
            <h1 className="text-xl font-bold font-rajdhani text-cyan-500">
              Error: {error}
            </h1>
          </div>
        ) : (
          <div>
            <GameGallery gameList={paginatedGames} />
          </div>
        )}
      </div>
    </section>
  );
}
