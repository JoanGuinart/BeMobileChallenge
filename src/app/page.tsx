"use client";
import CharacterCard from "@/components/CharacterCard";
import styles from "../styles/Home.module.scss";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";

type MarvelCharacter = {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
};

export default function Home() {
  const [characters, setCharacters] = useState<MarvelCharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const limit = 30;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 20, 90));
    }, 200);
    const fetchCharacters = async () => {
      try {
        const res = await fetch(`/api/marvel?limit=${limit}`);
        const data = await res.json();

        if (data?.data?.results) {
          setCharacters(data.data.results);
        } else {
          console.error("Marvel API returned unexpected data:", data);
          setCharacters([]);
        }
      } catch (err) {
        console.error(err);
        setCharacters([]);
      } finally {
        setLoading(false);
        clearInterval(interval);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <main className={styles.main}>
      {loading ? (
        <div className={styles.loadingContainer}>
          <div
            className={styles.loading}
            style={{ width: `${progress}%`, transition: "width 0.2s" }}
          ></div>
        </div>
      ) : (
        <div className={styles.mainContent}>
          <SearchBar numberOfResults={characters.length} />
          <div className={styles.grid}>
            {characters.map((char) => (
              <CharacterCard
                key={char.id}
                id={char.id}
                name={char.name}
                image={`${char.thumbnail.path}/standard_fantastic.${char.thumbnail.extension}`}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
