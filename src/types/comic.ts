import type { Thumbnail } from "./character";

export interface Comic {
  id: number;
  title: string;
  thumbnail: Thumbnail;
  startYear?: number;
}

export interface ComicProps {
  comic: Comic;
}

export interface ComicsSectionProps {
  characterId: number;
}
