type GamePopUpProps = {
  name: string;
  image: string;
}

export default function GamePopUp({ name, image }: GamePopUpProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-black">{name}</h1>
    </div>
  )
}