import Heart from "@/components/Heart";
import styles from "../../../styles/SingleCharacterPage.module.scss";
import { fetchMarvelCharacterById } from "@/lib/marvel";
import Image from "next/image";

interface CharacterPageProps {
  params: { id: string };
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { id } = params; 
  const data = await fetchMarvelCharacterById(id);
  const character = data.data.results[0];

  return (
    <main>
      <section className={styles.singleCharacter}>
        <Image
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          width={300}
          height={300}
          priority
        />
        <div className={styles.characterInfo}>
          <div>
            <h1>{character.name}</h1>
            <Heart id={character.id} heartClass={styles.heart} width={24} height={22}/>
          </div>
          <p>{character.description || "No description available."}</p>
        </div>
      </section>
      <section className={styles.comicsSection}>
        COMICS
      </section>
    </main>
  );
}
