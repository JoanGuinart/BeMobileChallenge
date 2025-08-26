"use client";

import { useState, useEffect, useRef } from "react";
import SearchBar from "@components/SearchBar";
import CharactersList from "@components/CharactersList";
import { useFavorites } from "@context/FavoritesContext";
import styles from "@styles/CharactersWithSearch.module.scss";
import LoadingBar from "@components/LoadingBar";
import type { Character, CharactersWithSearchProps } from "@types";

export default function CharactersWithSearch({
  initialCharacters,
}: CharactersWithSearchProps) {
  const [search, setSearch] = useState("");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const {
    showOnlyFavorites,
    favorites,
    loadingFavoritesContext,
    setLoadingFavoritesContext,
  } = useFavorites();

  const isLoading = showOnlyFavorites ? loadingFavoritesContext : loadingMore;

  // Inicializa characters según showOnlyFavorites
  useEffect(() => {
    if (showOnlyFavorites) {
      setCharacters([]); // limpio para que solo se vean favoritos
      setHasMore(false);
    } else if (initialCharacters?.length) {
      setCharacters(initialCharacters);
      setOffset(0);
      setHasMore(true);
    }
  }, [showOnlyFavorites, initialCharacters]);

  useEffect(() => {
    if (showOnlyFavorites) {
      setHasMore(false);
    } else if (initialCharacters?.length) {
      setCharacters(initialCharacters);
      setOffset(0);
      setHasMore(true);
    }
  }, [showOnlyFavorites, initialCharacters]);

  // Fetch de favoritos
  useEffect(() => {
    if (!showOnlyFavorites) return;

    const controller = new AbortController();
    setLoadingFavoritesContext(true);

    if (!favorites?.length) {
      setCharacters([]);
      setLoadingFavoritesContext(false);
      return () => controller.abort();
    }

    (async () => {
      try {
        const idsParam = favorites.join(",");
        const res = await fetch(
          `/api/marvel?ids=${encodeURIComponent(idsParam)}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`API ${res.status}`);
        const data = await res.json();
        let favChars: Character[] = data?.data?.results ?? [];

        const trimmed = search.trim().toLowerCase();
        if (trimmed) {
          favChars = favChars.filter((c) =>
            c.name.toLowerCase().includes(trimmed)
          );
        }

        setCharacters(favChars);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("Error fetching favorites", err);
        }
      } finally {
        setLoadingFavoritesContext(false);
      }
    })();

    return () => controller.abort();
  }, [favorites, showOnlyFavorites, search, setLoadingFavoritesContext]);

  // Fetch de todos los personajes (no favoritos)
  useEffect(() => {
    if (showOnlyFavorites) return;

    const controller = new AbortController();

    const fetchCharacters = async (reset = false) => {
      setLoadingMore(true);
      try {
        const params = new URLSearchParams();
        params.append("limit", offset === 0 && !isSearching ? "50" : "50");
        params.append("offset", String(offset));
        if (search.trim()) params.append("search", search.trim());

        const res = await fetch(`/api/marvel?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`API ${res.status}`);
        const data = await res.json();
        const newChars: Character[] = data?.data?.results ?? [];

        if (reset) {
          setCharacters(newChars);
        } else {
          setCharacters((prev) => {
            const ids = new Set(prev.map((c) => c.id));
            return [...prev, ...newChars.filter((c) => !ids.has(c.id))];
          });
        }

        if (newChars.length < (offset === 0 && !isSearching ? 50 : 15))
          setHasMore(false);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("Error fetching characters", err);
        }
      } finally {
        setLoadingMore(false);
      }
    };

    if (offset === 0) fetchCharacters(true);
    else fetchCharacters();

    return () => controller.abort();
  }, [search, offset, isSearching, showOnlyFavorites, initialCharacters]);

  // Control de búsqueda
  useEffect(() => {
    if (search.trim() === "") {
      setIsSearching(false);
      setOffset(0);
      setHasMore(true);
    } else {
      setIsSearching(true);
      setHasMore(false);
    }
  }, [search]);

  // Infinite scroll
  useEffect(() => {
    if (!hasMore || showOnlyFavorites || isSearching) return;
    const loader = loaderRef.current;
    if (!loader) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loadingMore) {
        setOffset((prev) => prev + 15);
      }
    });
    observer.observe(loader);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, showOnlyFavorites, isSearching]);

  console.log(loadingFavoritesContext, " aqui ");

  return (
    <>
      <LoadingBar loading={isLoading} />
      <div className={styles.mainPage}>
        {showOnlyFavorites && <h2 className={styles.favorites}>Favorites</h2>}
        <SearchBar
          value={search}
          numberOfResults={characters.length}
          onSearchChange={setSearch}
        />

        {showOnlyFavorites ? (
          loadingFavoritesContext ? (
            <p className={styles.loading}>Loading favorites...</p>
          ) : characters.length === 0 && !loadingFavoritesContext ? (
            <p>0 Characters found</p>
          ) : (
            <CharactersList
              key="favorites"
              characters={characters}
              search={search}
            />
          )
        ) : (
          <>
            <CharactersList key="all" characters={characters} search={search} />
            {hasMore && !isSearching && (
              <div
                ref={loaderRef}
                style={{ height: 40, textAlign: "center" }}
                className={styles.loading}
              >
                {loadingMore ? "Loading more..." : ""}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
