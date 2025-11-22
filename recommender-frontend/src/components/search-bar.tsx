"use client"

import { useEffect, useState, useRef } from "react";
import { fetchAllGameNames } from "@/utilities/api";
import truncate from "@/utilities/truncate";
import Image from "next/image";

interface GameTag {
  id: number;
  name: string;
}

type SearchBarProps = {
  onSearchSubmit: (tags: GameTag[]) => void;
};

export default function SearchBar({ onSearchSubmit }: SearchBarProps) {
  const [query, setQuery] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);
  const [currentTags, setCurrentTags] = useState<GameTag[]>([]);
  const [suggestions, setSuggestions] = useState<GameTag[]>([]);
  const [allTags, setAllTags] = useState<GameTag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchAllGameNames().then((data) => {
      setAllTags(allTags.concat(data));
      setLoading(false);
    }).catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setActive(false);
      }
    }

    function handleClickInside(event: MouseEvent) {
      if (wrapperRef.current && wrapperRef.current.contains(event.target as Node)) {
        setActive(true);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleClickInside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickInside);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0 && !loading && !error) {
      const matches = allTags.filter((tag) =>
        tag.name.toLowerCase().includes(value.toLowerCase())
      );
      const noDupeMatches = matches.filter((tag) =>
        !currentTags.includes(tag)
      )
      setSuggestions(noDupeMatches.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      addSuggestion(suggestions[0]);
    }
  };

  const handleSelect = (tag: GameTag) => {
    addSuggestion(tag);
  };

  const addSuggestion = (tag: GameTag) => {
    setCurrentTags(currentTags.concat(tag));
    setQuery("");
    setSuggestions([]);
  }

  const removeTag = (id: number) => {
    setCurrentTags((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="w-80 sm:w-120 md:w-160 flex flex-row items-center justify-center gap-4">
      <div ref={wrapperRef} className="relative min-w-4/5 max-w-4/5 flex flex-col items-center px-6 bg-neutral-200 border-4 border-orange-500">
        <div className="w-full h-16 flex flex-row items-center gap-4 z-20">
          <Image
            src="/search.svg"
            alt="search"
            width={24}
            height={24}
            className="object-contain"
          />

          <div className="w-full overflow-x-auto overscroll-x-contain flex flex-row gap-2">
            {currentTags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center flex-shrink-0 bg-neutral-400 whitespace-nowrap text-md text-neutral-600 font-rajdhani font-semibold px-2 py-2"
              >
                {truncate(tag.name, 20)}
                <button
                  className="ml-4 hover:text-black"
                  onClick={() => removeTag(tag.id)}
                >
                  ✕
                </button>
              </div>
            ))}
            <form onSubmit={handleSubmit} className="flex-1 min-w-40 sm:min-w-80">
              <input
                type="text"
                value={query}
                placeholder="Enter games..."
                className="w-full text-xl text-black font-rajdhani font-semibold px-2 py-2 focus:ring-0 focus:outline-none placeholder-neutral-500"
                onChange={handleChange}
              />
            </form>
          </div>
        </div>

        <div className="absolute left-0 right-0 top-0 max-h-78 pt-16 -m-[4px] bg-neutral-200 border-4 border-orange-500 z-10">
          {active && (
            loading ? (
              query != "" && (
                <div className="h-12 flex items-center text-lg text-black font-rajdhani font-semibold px-2 py-2 bg-neutral-200">Loading...</div>
              )
            ) : error ? (
              query != "" && (
                <div className="h-12 flex items-center text-lg text-black font-rajdhani font-semibold px-2 py-2 bg-neutral-200">Error: {error}</div>
              )
            ) : suggestions.length != 0 && (
              <div className="flex flex-col">
                {suggestions.map((tag) => (
                  <div
                    key={tag.id}
                    className="h-12 flex items-center text-lg text-black font-rajdhani font-semibold px-2 py-2 bg-neutral-200 hover:bg-neutral-100"
                    onClick={() => handleSelect(tag)}
                  >
                    {truncate(tag.name, 50)}
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>

      <div className="relative w-1/5 h-12">
        <div className="absolute inset-0 bg-neutral-700 -m-[5px]" />
        <div 
          className="absolute inset-0 flex items-center justify-center bg-neutral-200 text-md sm:text-xl text-black font-rajdhani font-semibold transform -translate-y-1 transition-transform active:translate-y-0 transition cursor-pointer"
          onClick={() => onSearchSubmit(currentTags)}
        >
          Search
        </div>
      </div>
    </div>
  );
}