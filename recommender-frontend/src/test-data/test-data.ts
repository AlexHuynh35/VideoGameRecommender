export interface Game {
  id: number;
  name: string;
  firstReleaseDate: string;
  rating: number;
  coverUrl: string;
  genres: string[];
  platforms: string[];
  companies: string[];
}

export const placeholder: Game[] = [
  {
    id: 0,
    name: "placeholder",
    firstReleaseDate: "placeholder",
    rating: 0,
    coverUrl: "/vercel.svg",
    genres: ["placeholder"],
    platforms: ["placeholder"],
    companies: ["placeholder"],
  },
]