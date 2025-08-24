import React from "react";
import Image from "next/image";
import styles from "@/styles/SingleCharacterPage.module.scss";
import Heart from "./Heart";
import ComicsSection from "./ComicsSection";

type CharacterProps = {
  id: number;
  name: string;
  description: string;
  thumbnailPath: string;
  thumbnailExt: string;
};

export default function SingleCharacterPage({
  character,
}: {
  character: CharacterProps;
}) {
  const src = `${character.thumbnailPath}.${character.thumbnailExt}`;

  console.log(character);

  return (
    <main>
      <section className={styles.singleCharacter}>
        <div>
          <Image
            src={src}
            alt={character.name}
            width={300}
            height={300}
            priority
          />
          <div className={styles.characterInfo}>
            <div>
              <h1>{character.name}</h1>
              <Heart id={character.id} isBig={true} heartClass={styles.heart} />
            </div>
            <p>{character.description || "No description available."}</p>
          </div>
        </div>
      </section>
      <ComicsSection characterId={character.id} />
    </main>
  );
}
