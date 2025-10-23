type GameDisplayProps = {
  name: string;
  image: string;
}

export default function GameDisplay({ name, image }: GameDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-black">{name}</h1>
    </div>
  )
}