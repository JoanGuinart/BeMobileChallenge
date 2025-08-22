"use client";

import { useState, useMemo } from "react";
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
  characters: MarvelCharacter[];
}

export default function CharactersWithSearch({
  characters,
}: CharactersWithSearchProps) {
  const [search, setSearch] = useState("");
  const { showOnlyFavorites, favorites } = useFavorites();

  const filteredBySearch = useMemo(
    () =>
      characters.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      ),
    [characters, search]
  );

  const displayedCharacters = useMemo(() => {
    if (!showOnlyFavorites) return filteredBySearch;
    return filteredBySearch.filter((c) => favorites.includes(c.id));
  }, [filteredBySearch, showOnlyFavorites, favorites]);

  return (
    <div>
      {showOnlyFavorites && <h2 className={styles.favorites}>Favorites</h2>}
      <SearchBar
        numberOfResults={displayedCharacters.length}
        onSearchChange={setSearch}
      />
      <CharacterList characters={displayedCharacters} />
    </div>
  );
}
