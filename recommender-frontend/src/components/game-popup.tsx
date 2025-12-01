"use client"

import { useState, useEffect } from "react";
import { GameCard, GameDisplay } from "@/components";
import { Game } from "@/test-data/test-data";

type GamePopUpProps = {
  game: Game;
}

export default function GamePopUp({ game }: GamePopUpProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div>
      <div className={`transform transition-all duration-500 ease-out ${isOpen ? "scale-120 opacity-0" : "scale-100 opacity-100"} hover:-translate-y-2`} onClick={() => setIsOpen(true)}>
        <GameCard name={game.name} image={game.coverUrl} />
      </div>

      <div>
        <div className={`fixed inset-0 flex items-center justify-center transition-transform duration-300 ${isOpen ? "translate-x-0 ease-out" : "-translate-x-full ease-in"} z-50`}>
          <div className="relative w-[64rem] h-[80vh] p-6">
            <div className={`absolute -top-5 right-30 w-40 aspect-[3/4] transform transition-transform duration-500 ease-in ${isOpen ? "translate-y-0" : "-translate-y-full"}`}>
              <GameCard name={game.name} image={game.coverUrl} />
            </div>

            <div className={`absolute top-4 right-25 w-50 aspect-[8/1] z-50`}>
              <div className="absolute inset-0 bg-neutral-400 shadow-md [clip-path:polygon(0%_0%,10%_0%,10%_20%,90%_20%,90%_0%,100%_0%,100%_100%,0%_100%)]" />
            </div>

            <div className="relative h-full z-40">
              <div className="absolute inset-0 bg-orange-500 translate-x-2 translate-y-2 [clip-path:polygon(0%_10%,10%_0%,100%_0%,100%_90%,90%_100%,0%_100%)]" />
              <div className="absolute inset-0 bg-neutral-200 [clip-path:polygon(0%_10%,10%_0%,100%_0%,100%_90%,90%_100%,0%_100%)] z-40">
                <div className={`h-full overflow-y-auto transform transition-opacity duration-500 ease-in ${isOpen ? "opacity-100" : "opacity-0"}`}>
                  <GameDisplay
                    game={game}
                  />
                </div>
                <button className="absolute top-2 right-4 text-2xl text-gray-600 hover:text-black" onClick={() => setIsOpen(false)}>
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
        )}
      </div>
    </div>
  )
}