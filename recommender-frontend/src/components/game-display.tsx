import Image from "next/image";
import formatDate from "@/utilities/format-date";
import { Game } from "@/test-data/test-data";

type GameDisplayProps = {
  game: Game;
}

export default function GameDisplay({ game }: GameDisplayProps) {
  const fixedImage = (game.coverUrl.startsWith("//") ? `https:${game.coverUrl}` : game.coverUrl).replace("t_thumb", "t_cover_big");
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="absolute top-0 w-80 h-8 bg-neutral-200 z-30" />
      <div className="absolute bottom-0 w-80 h-8 bg-neutral-200 z-30" />

      <div className="hidden sm:block absolute translate-x-45 lg:translate-x-70 top-0 bottom-0 w-1 bg-neutral-400 my-8" />
      <div className="hidden sm:block absolute -translate-x-45 lg:-translate-x-70 top-0 bottom-0 w-1 bg-neutral-400 my-8" />

      <div className="hidden lg:block absolute -translate-x-95 top-0 bottom-0 w-40 my-4">
        <div className="absolute top-30 translate-x-10 w-20 h-20 bg-neutral-300 shadow-md rounded-full" />
        <div className="absolute bottom-50 translate-x-15 w-10 h-10 bg-neutral-300 shadow-md rounded-full" />
        <div className="absolute bottom-40 translate-x-5 w-10 h-10 bg-neutral-300 shadow-md rounded-full" />
        <div className="absolute bottom-30 translate-x-15 w-10 h-10 bg-neutral-300 shadow-md rounded-full" />
        <div className="absolute bottom-40 translate-x-25 w-10 h-10 bg-neutral-300 shadow-md rounded-full" />
      </div>

      <div className="hidden lg:block absolute translate-x-95 top-0 bottom-0 w-40 my-4">
        <div className="absolute bottom-30 translate-x-10 w-20 h-20 bg-neutral-300 shadow-md rounded-full" />
        <div className="absolute top-50 translate-x-15 w-10 h-10 bg-neutral-300 shadow-md rounded-full" />
        <div className="absolute top-40 translate-x-5 w-10 h-10 bg-neutral-300 shadow-md rounded-full" />
        <div className="absolute top-30 translate-x-15 w-10 h-10 bg-neutral-300 shadow-md rounded-full" />
        <div className="absolute top-40 translate-x-25 w-10 h-10 bg-neutral-300 shadow-md rounded-full" />
      </div>

      <div className="relative w-70 aspect-[1/1] flex items-center justify-center my-8">
        <div className="relative w-7/8 aspect-[1/1] border-6 border-cyan-600">
          <Image
            src={fixedImage}
            alt={game.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute bottom-0 bg-cyan-500 shadow-md w-15/16 p-2 flex items-center justify-center">
          <h1 className="text-xl font-semibold font-orbiton text-black text-center">{game.name}</h1>
        </div>

        <div className="absolute top-3 right-3 w-1/4 aspect-[1/1] flex items-center justify-center">
          <div className="absolute inset-0 -m-[10px] bg-yellow-500 [clip-path:polygon(50%_5%,65%_35%,98%_38%,75%_60%,82%_92%,50%_75%,18%_92%,25%_60%,2%_38%,35%_35%)]" />
          <div className="absolute inset-0 bg-yellow-400 [clip-path:polygon(50%_5%,65%_35%,98%_38%,75%_60%,82%_92%,50%_75%,18%_92%,25%_60%,2%_38%,35%_35%)] z-10" />
          <h1 className="text-lg font-bold font-orbiton text-black pt-1 z-20">{Math.round(game.rating)}</h1>
        </div>
      </div>

      <div className="relative w-70 flex flex-row items-center justify-center mb-8 gap-4">
        <div className="relative bg-cyan-500 shadow-md w-1/2 p-2">
          <h1 className="text-lg font-semibold font-orbiton text-black text-center">Release Date</h1>
        </div>
        <div className="relative w-1/2">
          <h1 className="text-xl font-rajdhani text-black text-center">{formatDate(game.firstReleaseDate)}</h1>
        </div>
      </div>

      <div className="relative w-70 bg-neutral-300 rounded-lg shadow-inner flex items-center justify-center mb-8">
        <div className="absolute -top-4 left-4 bg-cyan-500 shadow-md p-2">
          <h1 className="text-lg font-semibold font-orbiton text-black text-center">Genres</h1>
        </div>
        <div className="p-8 mt-2">
          <ul className="text-lg text-center font-rajdhani text-black">
            {game.genres.map((genre, idx) => (
              <li key={idx}>
                {genre}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative w-70 bg-neutral-300 rounded-lg shadow-inner flex items-center justify-center mb-8">
        <div className="absolute -top-4 left-4 bg-cyan-500 shadow-md p-2">
          <h1 className="text-lg font-semibold font-orbiton text-black text-center">Platforms</h1>
        </div>
        <div className="p-8 mt-2">
          <ul className="text-lg text-center font-rajdhani text-black">
            {game.platforms.map((platform, idx) => (
              <li key={idx}>
                {platform}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative w-70 bg-neutral-300 rounded-lg shadow-inner flex items-center justify-center mb-8">
        <div className="absolute -top-4 left-4 bg-cyan-500 shadow-md p-2">
          <h1 className="text-lg font-semibold font-orbiton text-black text-center">Companies</h1>
        </div>
        <div className="p-8 mt-2">
          <ul className="text-lg text-center font-rajdhani text-black">
            {game.companies.map((company, idx) => (
              <li key={idx}>
                {company}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}