"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "@/styles/SingleCharacterPage.module.scss";
import Heart from "./Heart";
import ComicsSection from "./ComicsSection";
import LoadingBar from "./LoadingBar";

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

  const [isLoading, setIsLoading] = useState(true);


  return (
    <main>
      <LoadingBar loading={isLoading} />
      <section className={styles.singleCharacter}>
        <div>
          <Image
            src={src}
            alt={character.name}
            width={300}
            height={300}
            priority
            onLoad={() => setIsLoading(false)}
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
