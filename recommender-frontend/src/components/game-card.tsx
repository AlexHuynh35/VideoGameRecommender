import Image from "next/image";

type GameCardProps = {
  name: string;
  image: string;
}

export default function GameCard({ name, image }: GameCardProps) {
  return (
    <div className="flex flex-col items-center text-center bg-white rounded-lg shadow p-4">
      <div className="relative w-full aspect-[3/4] mb-6">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <h3 className="text-lg font-semibold font-rajdhani text-black">{name}</h3>
    </div>
  )
}