"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "@styles/SingleCharacterPage.module.scss";
import Heart from "@components/Heart";
import ComicsSection from "@components/ComicsSection";
import LoadingBar from "@components/LoadingBar";
import type { Character } from "@types";

interface SingleCharacterPageProps {
  character: Character;
}

export default function SingleCharacterPage({
  character,
}: SingleCharacterPageProps) {
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
