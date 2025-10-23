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
    firstReleaseDate: "2000-01-01",
    rating: 0,
    coverUrl: "/placeholder.jpg",
    genres: ["placeholder", "placeholder"],
    platforms: ["placeholder", "placeholder", "placeholder"],
    companies: ["placeholder"],
  },
]