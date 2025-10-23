import { GamePopUp } from "@/components";
import { Game } from "@/test-data/test-data";

type GameGalleryProps = {
  gameList: Game[]
}

export default function GameGallery({ gameList }: GameGalleryProps) {
  return (
    <div className="max-w-6xl mx-auto my-12 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-10">
      {gameList.map((game, idx) => (
        <GamePopUp
          key={idx}
          name={game.name}
          image={game.coverUrl}
        />
      ))}
    </div>
  )
}