import CharacterCard from "./CharacterCard";
import styles from "../styles/CharactersList.module.scss";
import { useFavorites } from "@/context/FavoritesContext";

type MarvelCharacter = {
  id: number;
  name: string;
  thumbnail: { path: string; extension: string };
};

interface Props {
  characters: MarvelCharacter[];
  search?: string;
}

export default function CharacterList({ characters, search = "" }: Props) {
  const { favorites, showOnlyFavorites } = useFavorites();

  const filtered = characters.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesFavorites = showOnlyFavorites
      ? favorites.includes(c.id)
      : true;
    return matchesSearch && matchesFavorites;
  });

  return (
    <div className={styles.grid}>
      {filtered.map((char) => (
        <CharacterCard
          key={char.id}
          id={char.id}
          name={char.name}
          image={`${char.thumbnail.path}/standard_fantastic.${char.thumbnail.extension}`}
        />
      ))}
    </div>
  );
}
