"use client"

import { useState } from "react";
import { GameCard, GameDisplay } from "@/components";

type GamePopUpProps = {
  name: string;
  image: string;
}

export default function GamePopUp({ name, image }: GamePopUpProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className={`transform transition-all duration-300 ease-out ${isOpen ? "scale-120 opacity-0" : "scale-100 opacity-100"} hover:-translate-y-2`} onClick={() => setIsOpen(true)}>
        <GameCard name={name} image={image} />
      </div>

      <div>
        <div className={`fixed inset-0 flex items-center justify-center transition-transform duration-300 ${isOpen ? "translate-x-0 ease-out" : "-translate-x-full ease-in"} z-20`}>
          <div className="relative w-[48rem] h-[80vh] p-6">
            <div className={`absolute -top-5 right-30 w-40 aspect-[3/4] transform transition-transform duration-500 ease-in ${isOpen ? "translate-y-0" : "-translate-y-full"}`}>
              <GameCard name={name} image={image} />
            </div>

            <div className={`absolute top-4 right-25 w-50 aspect-[8/1] z-20`}>
              <div className="absolute inset-0 bg-neutral-400 [clip-path:polygon(0%_0%,10%_0%,10%_20%,90%_20%,90%_0%,100%_0%,100%_100%,0%_100%)]" />
            </div>

            <div className="relative h-full z-10">
              <div className="absolute inset-0 bg-orange-500 translate-x-2 translate-y-2 [clip-path:polygon(0%_10%,10%_0%,100%_0%,100%_90%,90%_100%,0%_100%)]" />
              <div className="absolute inset-0 bg-neutral-200 [clip-path:polygon(0%_10%,10%_0%,100%_0%,100%_90%,90%_100%,0%_100%)] z-10">
                <div className={`transform transition-opacity duration-500 ease-in ${isOpen ? "opacity-100" : "opacity-0"}`}>
                  <GameDisplay name={name} image={image} />
                </div>
                <button className="absolute top-0 right-2 text-2xl text-gray-600 hover:text-black" onClick={() => setIsOpen(false)}>
                  x
                </button>
              </div>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10" />
        )}
      </div>
    </div>
  )
}