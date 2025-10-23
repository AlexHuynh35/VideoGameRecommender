import Image from "next/image";

type GameCardProps = {
  name: string;
  image: string;
}

export default function GameCard({ name, image }: GameCardProps) {
  return (
    <div className="relative w-full aspect-[3/4]">
      <div className="absolute inset-0 bg-cyan-500 translate-x-2 translate-y-2 [clip-path:polygon(0%_0%,100%_0%,100%_90%,90%_100%,0%_100%)]" />
      <div className="absolute inset-0 bg-slate-200 flex flex-col items-center justify-center [clip-path:polygon(0%_0%,100%_0%,100%_90%,90%_100%,0%_100%)] z-10">
        <div className="relative w-3/4 aspect-[1/1] mb-8">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-lg font-semibold font-rajdhani text-black">{name}</h3>
      </div>
    </div>
  )
}