"use client"

import { useState } from "react";
import { GamePopUp } from "@/components";
import Image from "next/image";

type GameCardProps = {
  name: string;
  image: string;
}

export default function GameCard({ name, image }: GameCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="relative w-full aspect-[3/4]" onClick={() => setIsOpen(true)}>
        <div className="absolute inset-0 bg-cyan-500 translate-x-2 translate-y-2 [clip-path:polygon(0%_0%,100%_0%,100%_90%,90%_100%,0%_100%)] -z-10" />
        <div className="relative w-full h-full p-4 bg-slate-200 flex flex-col items-center justify-center [clip-path:polygon(0%_0%,100%_0%,100%_90%,90%_100%,0%_100%)]">
          <div className="relative w-3/4 aspect-[1/1] mb-8">
            <Image
              src={image}
              alt={name}
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-lg font-semibold font-rajdhani text-black">{name}</h3>
        </div>
      </div>
      <div>
        {isOpen && (
          <div>
            <div className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-10">
              <div className="relative max-w-3xl w-full mx-auto max-h-[90vh] p-6 bg-white overflow-y-auto">
                <GamePopUp name={name} image={image} />
                <button className="absolute top-3 right-3 text-gray-600 hover:text-black" onClick={() => setIsOpen(false)}>
                  x
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}