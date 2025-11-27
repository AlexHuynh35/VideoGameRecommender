"use client"

import { useEffect, useState, useRef } from "react";

type SortType = "name" | "rating" | "similarity";

type SortDropdownProps = {
  onSortSubmit: (type: SortType) => void;
};

export default function SortDropdown({ onSortSubmit }: SortDropdownProps) {
  const [active, setActive] = useState<boolean>(false);
  const [currentSortType, setCurrentSortType] = useState<SortType>("name");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const allSortType: SortType[] = ["name", "rating", "similarity"];

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

  return (
    <div className="w-20 flex flex-row items-center justify-center gap-2">
      <div ref={wrapperRef} className="relative min-w-3/5 max-w-3/5 flex flex-col items-center px-6 bg-neutral-200 border-4 border-orange-500">
        <div className="w-full h-12 flex justify-center items-center text-xs text-black text-center font-rajdhani font-semibold px-2 py-2 z-20">Sort: {currentSortType.charAt(0).toUpperCase() + currentSortType.slice(1)}</div>
        <div className="absolute left-0 right-0 top-0 max-h-38 pt-12 -m-[4px] bg-neutral-200 border-4 border-orange-500 z-10">
          {active && (
            <div className="flex flex-col">
              {allSortType.map(type => (
                <div
                  key={type}
                  className="h-8 flex items-center text-xs text-black font-rajdhani font-semibold px-2 py-2 bg-neutral-200 hover:bg-neutral-100"
                  onClick={() => setCurrentSortType(type)}
                >
                  <span className="truncate">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="relative w-2/5 h-8">
        <div className="absolute inset-0 bg-neutral-700 -m-[5px]" />
        <div
          className="absolute inset-0 flex items-center justify-center bg-neutral-200 text-sm sm:text-md text-black font-rajdhani font-semibold transform -translate-y-1 transition-transform active:translate-y-0 transition cursor-pointer"
          onClick={() => onSortSubmit(currentSortType)}
        >
          ▼
        </div>
      </div>
    </div>
  )
}