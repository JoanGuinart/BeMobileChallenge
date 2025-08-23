"use client";

import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import CharacterList from "./CharactersList";
import { useFavorites } from "@/context/FavoritesContext";
import styles from "../styles/CharactersWithSearch.module.scss";

type MarvelCharacter = {
  id: number;
  name: string;
  thumbnail: { path: string; extension: string };
};

interface CharactersWithSearchProps {
  initialCharacters: MarvelCharacter[];
}

export default function CharactersWithSearch({
  initialCharacters,
}: CharactersWithSearchProps) {
  const [search, setSearch] = useState("");
  const [characters, setCharacters] =
    useState<MarvelCharacter[]>(initialCharacters);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const { showOnlyFavorites, favorites } = useFavorites();

  useEffect(() => {
    const controller = new AbortController();

    if (showOnlyFavorites) {
      setLoadingFavorites(true);
      if (!favorites || favorites.length === 0) {
        setCharacters([]);
        setLoadingFavorites(false);
        return () => controller.abort();
      }

      (async () => {
        try {
          const idsParam = favorites.join(",");
          const res = await fetch(
            `/api/marvel?ids=${encodeURIComponent(idsParam)}`,
            {
              signal: controller.signal,
            }
          );
          const data = await res.json();
          setCharacters(data?.data?.results ?? []);
        } catch (err) {
          if (!(err instanceof Error && err.name === "AbortError")) {
            console.error("Error fetching favorites", err);
          }
        } finally {
          setLoadingFavorites(false);
        }
      })();

      return () => controller.abort();
    }

    const handler = setTimeout(async () => {
      const trimmed = search.trim();
      if (trimmed === "") {
        setCharacters(initialCharacters);
        return;
      }

      try {
        const params = new URLSearchParams();
        params.append("limit", "50");
        params.append("search", trimmed);

        const res = await fetch(`/api/marvel?${params.toString()}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setCharacters(data?.data?.results ?? []);
      } catch (err) {
        if (!(err instanceof Error && err.name === "AbortError")) {
          console.error("Error fetching characters", err);
        }
      }
    }, 300);

    return () => {
      clearTimeout(handler);
      controller.abort();
    };
  }, [search, showOnlyFavorites, favorites, initialCharacters]);

  const displayedCharacters = characters;

  return (
    <div>
      {showOnlyFavorites && <h2 className={styles.favorites}>Favorites</h2>}
      <SearchBar
        numberOfResults={displayedCharacters.length}
        onSearchChange={setSearch}
      />
      {showOnlyFavorites && loadingFavorites ? (
        <p>Loading favorites...</p>
      ) : (
        <CharacterList characters={displayedCharacters} />
      )}
    </div>
  );
}
