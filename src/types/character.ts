export interface Thumbnail {
  path: string;
  extension: string;
}

export interface Character {
  id: number;
  name: string;
  description?: string;
  thumbnailPath: string;
  thumbnailExt: string;
  thumbnail?: Thumbnail | null;
}

export interface CharacterCardProps {
  image: string;
  name: string;
  id: number;
}

export interface CharactersWithSearchProps {
  initialCharacters: Character[];
}

export interface CharactersListProps {
  characters: Character[];
  search?: string;
}
