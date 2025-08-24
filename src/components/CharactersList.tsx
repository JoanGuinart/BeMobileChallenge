import CharacterCard from "./CharacterCard";
import styles from "../styles/CharactersList.module.scss";

type MarvelCharacter = {
  id: number;
  name: string;
  thumbnail?: { path?: string; extension?: string } | null;
};

interface Props {
  characters: MarvelCharacter[];
  search?: string;
}

export default function CharacterList({ characters, search = "" }: Props) {
  const filtered = characters.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.grid} role="list">
      {filtered.map((char) => {
        const thumb = char.thumbnail?.path
          ? `${String(char.thumbnail.path).replace(
              /^http:/,
              "https:"
            )}/standard_fantastic.${char.thumbnail?.extension ?? "jpg"}`
          : "/images/placeholder-character.png";

        return (
          <CharacterCard
            key={char.id}
            id={char.id}
            name={char.name}
            image={thumb}
          />
        );
      })}
    </div>
  );
}
