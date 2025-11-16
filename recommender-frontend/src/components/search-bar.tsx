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
  const [allTags, setAllTags] = useState<GameTag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllGameNames().then((data) => {
      setAllTags(allTags.concat(data));
      setCurrentTags(data.slice(0, 10));
      setLoading(false);
    }).catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }, []);

  const removeTag = (id: number) => {
    setCurrentTags((prev) => prev.filter((t) => t.id !== id));
  };

  if (loading) return <div></div>;

  if (error) return <div></div>;

  return (
    <div className="relative max-w-4xl mx-auto h-20 my-12">
      <div className={`absolute inset-0 -m-[5px] bg-neutral-700`} />
      <div className="absolute inset-0 w-full flex flex-row items-center px-6 bg-neutral-200">
        <div className="relative w-1/20">
          <Image
            src="/search.svg"
            alt="search"
            width={24}
            height={24}
            className={`object-contain`}
          />
        </div>

        <div className="relative w-19/20 h-3/5 overflow-x-auto overscroll-x-contain flex flex-row gap-2">
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
            className="w-80 text-xl text-black font-rajdhani font-semibold px-2 py-2 focus:ring-0 focus:outline-none placeholder-neutral-500"
          />
        </div>
      </div>
    </div>
  );
}