import React from "react";

type TitleProp = {
  name: string;
  first_release_date: string;
  rating: number;
}

type Str = {str: string}
type Num = {num: number}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const GameName: React.FC<Str> = ({ str }) => {
  if (!str) {
    return (
      <div>
        <p className="font-bold text-xl">Name Not Available!</p>
      </div>
    )
  }
  return (
    <div>
      <p className="font-bold text-xl">{str}</p>
    </div>
  )
};

const GameReleaseDate: React.FC<Str> = ({ str }) => {
  if (!str) {
    return (
      <div>
        <p>Released: Date Not Available!</p>
      </div>
    )
  }
  return (
    <div>
      <p>Released: {formatDate(str)}</p>
    </div>
  )
};

const GameRating: React.FC<Num> = ({ num }) => {
  if (!num && num != 0) {
    return (
      <div className="w-20 flex-none">
        <p className="bold">?</p>
      </div>
    )
  }
  return (
    <div className="w-20 flex-none">
      <p className="bold">{num}</p>
    </div>
  )
};

const GameTitle: React.FC<TitleProp> = ({ name, first_release_date, rating }) => {
  return (
    <div className="flex">
      <div className="w-80 flex-none">
        <GameName str={name} />
        <GameReleaseDate str={first_release_date} />
      </div>
      <GameRating num={rating} />
    </div>
  );
};
  
export default GameTitle