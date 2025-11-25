"use client"

import { useEffect, useState, useRef } from "react";
import { fetchAllGenres, fetchAllPlatforms } from "@/utilities/api";

type FilterType = "genre" | "platform";

interface FilterTag {
  id: number;
  name: string;
}

type FilterDropdownProps = {
  filterType: FilterType
  onFilterSubmit: (tags: FilterTag[]) => void;
};

export default function FilterDropdown({ filterType, onFilterSubmit }: FilterDropdownProps) {
  const [active, setActive] = useState<boolean>(false);
  const [currentTags, setCurrentTags] = useState<FilterTag[]>([]);
  const [allTags, setAllTags] = useState<FilterTag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (filterType == "genre") {
      fetchAllGenres().then((data) => {
        setAllTags(allTags.concat(data));
        setLoading(false);
      }).catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    } else if (filterType == "platform") {
      fetchAllPlatforms().then((data) => {
        setAllTags(allTags.concat(data));
        setLoading(false);
      }).catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    }
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

  const toggleSelect = (filter: FilterTag) => {
    const exists = currentTags.find(f => f.id === filter.id);
    if (exists) {
      setCurrentTags(currentTags.filter(f => f.id !== filter.id));
    } else {
      setCurrentTags(currentTags.concat(filter));
    }
  }

  return (
    <div className="w-40 flex flex-row items-center justify-center gap-2">
      <div ref={wrapperRef} className="relative min-w-4/5 max-w-4/5 flex flex-col items-center px-6 bg-neutral-200 border-4 border-orange-500">
        <div className="w-full h-12 flex justify-center items-center text-lg text-black font-rajdhani font-semibold px-2 py-2 z-20">{filterType.charAt(0).toUpperCase() + filterType.slice(1)}</div>
        <div className="absolute left-0 right-0 top-0 max-h-54 pt-12 -m-[4px] bg-neutral-200 border-4 border-orange-500 z-10">
          {active && (
            loading ? (
              <div className="h-8 flex items-center text-md text-black font-rajdhani font-semibold px-2 py-2 bg-neutral-200">Loading...</div>
            ) : error ? (
              <div className="h-8 flex items-center text-xs text-black font-rajdhani font-semibold px-2 py-2 bg-neutral-200">Error: {error}</div>
            ) : (
              <div className="overflow-y-auto overscroll-y-contain max-h-40">
                {allTags.map(filter => (
                  <label key={filter.id} className="h-8 flex items-center text-md text-black font-rajdhani font-semibold px-2 py-2 bg-neutral-200">
                    <input
                      type="checkbox"
                      checked={!currentTags.some(f => f.id === filter.id)}
                      onChange={() => toggleSelect(filter)}
                    />
                    <span className="pl-2 truncate">{filter.name}</span>
                  </label>
                ))}
              </div>
            )
          )}
        </div>
      </div>

      <div className="relative w-1/5 h-8">
        <div className="absolute inset-0 bg-neutral-700 -m-[5px]" />
        <div
          className="absolute inset-0 flex items-center justify-center bg-neutral-200 text-md sm:text-xl text-black font-rajdhani font-semibold transform -translate-y-1 transition-transform active:translate-y-0 transition cursor-pointer"
          onClick={() => onFilterSubmit(currentTags)}
        >
          ▼
        </div>
      </div>
    </div>
  )
}