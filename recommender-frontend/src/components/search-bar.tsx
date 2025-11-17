"use client"

import { useEffect, useState } from "react";
import { fetchAllGameNames } from "@/utilities/api";
import Image from "next/image";

interface GameTag {
  id: number;
  name: string;
}

export default function SearchBar() {
  const [inputValue, setInputValue] = useState<string>("");
  const [currentTags, setCurrentTags] = useState<GameTag[]>([]);
  const [suggestions, setSuggestions] = useState<GameTag[]>([]);
  const [allTags, setAllTags] = useState<GameTag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllGameNames().then((data) => {
      setAllTags(allTags.concat(data));
      setCurrentTags(data.slice(0, 10));
      setSuggestions(data.slice(10, 15))
      setLoading(false);
    }).catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }, []);

  const addSuggestion = (tag: GameTag) => {
    setCurrentTags(currentTags.concat(tag));
    setSuggestions((prev) => prev.filter((t) => t !== tag));
  }

  const removeTag = (id: number) => {
    setCurrentTags((prev) => prev.filter((t) => t.id !== id));
  };

  if (loading) return <div></div>;

  if (error) return <div></div>;

  return (
    <div className="max-w-4xl mx-auto flex flex-row items-center justify-center gap-8 my-12">
      <div className="relative w-4/5 flex flex-col items-center px-6 bg-neutral-200 border-4 border-orange-500">
        <div className="w-full h-20 flex flex-row items-center z-20">
          <div className="w-10">
            <Image
              src="/search.svg"
              alt="search"
              width={24}
              height={24}
              className={`object-contain`}
            />
          </div>

          <div className="w-19/20 h-3/5 overflow-x-auto overscroll-x-contain flex flex-row gap-2">
            {currentTags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center bg-neutral-400 whitespace-nowrap text-md text-neutral-600 font-rajdhani font-semibold px-2 py-2"
              >
                {tag.name}
                <button
                  onClick={() => removeTag(tag.id)}
                  className="ml-4 hover:text-black"
                >
                  ✕
                </button>
              </div>
            ))}

            <input
              type="text"
              placeholder="Enter games..."
              className="w-60 text-xl text-black font-rajdhani font-semibold px-2 py-2 focus:ring-0 focus:outline-none placeholder-neutral-500"
            />
          </div>
        </div>

        {suggestions.length != 0 && (
          <div className="absolute h-80 inset-0 bg-neutral-200 border-4 border-orange-500 flex flex-col z-10">
            <div className="py-10"></div>
            {suggestions.map((tag) => (
              <div
                key={tag.id}
                className="w-full h-12 flex items-center text-lg text-black font-rajdhani font-semibold px-2 py-2 bg-neutral-200 hover:bg-neutral-100"
                onClick={() => addSuggestion(tag)}
              >
                {tag.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="relative w-4/5 h-16">
        <div className="absolute inset-0 bg-neutral-700 -m-[5px]" />
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 text-md sm:text-xl text-black font-rajdhani font-semibold transform -translate-y-1 transition-transform active:translate-y-0 transition cursor-pointer">
          Search
        </div>
      </div>
    </div>
  );
}