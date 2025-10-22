import { GameGallery } from "@/components";
import { placeholder } from "@/test-data/test-data";

export default function Home() {
  return (
    <section className="p-6">
      <div className="max-w-7xl mx-auto my-12 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-7xl xl:text-8xl font-bold font-orbitron text-cyan-500">
          Video Game
        </h1>
        <h1 className="text-4xl sm:text-6xl md:text-8xl xl:text-9xl font-bold font-orbitron text-cyan-500">
          Recommender
        </h1>
      </div>
      
      <GameGallery gameList={Array(20).fill(placeholder[0])} />
    </section>
  );
}
