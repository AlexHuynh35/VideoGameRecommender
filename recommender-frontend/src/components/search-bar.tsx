"use client"

import { useEffect, useState } from "react";
import Image from "next/image";

type SearchBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export default function SearchBar() {

  return (
    <div className="relative max-w-4xl mx-auto h-20 my-12">
      <div className={`absolute inset-0 -m-[5px] bg-neutral-700`} />
      <div className="absolute inset-0 w-full flex flex-row items-center justify-center px-6 bg-neutral-200">
        <div className="relative w-1/20">
          <Image
            src="/search.svg"
            alt="search"
            width={24}
            height={24}
            className={`object-contain`}
          />
        </div>
        <div className="relative w-19/20">
          <input
            type="text"
            placeholder="Enter games..."
            className="w-full text-xl text-black font-rajdhani font-semibold px-2 py-2 focus:ring-0 focus:outline-none placeholder-neutral-500"
          />
        </div>
      </div>
    </div>
  );
}