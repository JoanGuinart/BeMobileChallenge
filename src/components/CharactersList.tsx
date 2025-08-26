import CharacterCard from "@components/CharacterCard";
import styles from "@styles/CharactersList.module.scss";
import type { CharactersListProps } from "@types";

export default function CharacterList({
  characters,
  search = "",
}: CharactersListProps) {
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
