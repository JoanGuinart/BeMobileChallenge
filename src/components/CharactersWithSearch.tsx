"use client";

import { useState, useEffect, useRef } from "react";
import SearchBar from "@components/SearchBar";
import CharactersList from "@components/CharactersList";
import { useFavorites } from "@context/FavoritesContext";
import styles from "@styles/CharactersWithSearch.module.scss";
import LoadingBar from "@components/LoadingBar";

type MarvelCharacter = {
  id: number;
  name: string;
  thumbnail?: { path?: string; extension?: string } | null;
};

interface CharactersWithSearchProps {
  initialCharacters: MarvelCharacter[];
}

export default function CharactersWithSearch({
  initialCharacters,
}: CharactersWithSearchProps) {
  const [search, setSearch] = useState("");
  // Inicializamos con initialCharacters para evitar el "pantallazo en blanco"
  const [characters, setCharacters] = useState<MarvelCharacter[]>(
    initialCharacters ?? []
  );
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const { showOnlyFavorites, favorites } = useFavorites();
  const isLoading = loadingFavorites || loadingMore;

  useEffect(() => {
    if (
      !showOnlyFavorites &&
      initialCharacters &&
      initialCharacters.length > 0
    ) {
      setCharacters(initialCharacters);
      setOffset(0);
      setHasMore(true);
    }
  }, [initialCharacters, showOnlyFavorites]);

  useEffect(() => {
    setSearch("");
    setOffset(0);
    setHasMore(showOnlyFavorites ? false : true);
    setIsSearching(false);
  }, [showOnlyFavorites]);

  useEffect(() => {
    if (!showOnlyFavorites) return;

    const controller = new AbortController();
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
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`API ${res.status}`);
        const data = await res.json();
        let favChars: MarvelCharacter[] = data?.data?.results ?? [];
        const trimmed = search.trim().toLowerCase();
        if (trimmed !== "") {
          favChars = favChars.filter((c: MarvelCharacter) =>
            c.name.toLowerCase().includes(trimmed)
          );
        }
        setCharacters(favChars);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("Error fetching favorites", err);
        }
      } finally {
        setLoadingFavorites(false);
      }
    })();

    return () => controller.abort();
  }, [favorites, showOnlyFavorites, search]);

  useEffect(() => {
    if (showOnlyFavorites) return;

    const controller = new AbortController();

    const fetchCharacters = async (reset = false) => {
      const trimmed = search.trim();
      setLoadingMore(true);
      try {
        const params = new URLSearchParams();
        if (offset === 0 && !isSearching) {
          params.append("limit", "50");
          params.append("offset", "0");
        } else {
          params.append("limit", "50");
          params.append("offset", String(offset));
        }
        if (trimmed !== "") params.append("search", trimmed);
        const res = await fetch(`/api/marvel?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`API ${res.status}`);
        const data = await res.json();
        const newChars = data?.data?.results ?? [];
        if (reset) {
          setCharacters(newChars);
        } else {
          setCharacters((prev) => {
            const ids = new Set(prev.map((c) => c.id));
            return [
              ...prev,
              ...newChars.filter((c: MarvelCharacter) => !ids.has(c.id)),
            ];
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

    if (search.trim() === "" && offset === 0 && !isSearching) {
      if (initialCharacters && initialCharacters.length > 0) {
        setCharacters(initialCharacters);
        setHasMore(true);
      } else {
        fetchCharacters(true);
      }
      return () => controller.abort();
    }

    if (isSearching) {
      const handler = setTimeout(async () => {
        setLoadingMore(true);
        try {
          const params = new URLSearchParams();
          params.append("limit", "50");
          params.append("search", search.trim());
          const res = await fetch(`/api/marvel?${params.toString()}`, {
            signal: controller.signal,
          });
          if (!res.ok) throw new Error(`API ${res.status}`);
          const data = await res.json();
          setCharacters(data?.data?.results ?? []);
          setHasMore(false);
        } catch (err: unknown) {
          if (err instanceof Error && err.name !== "AbortError") {
            console.error("Error fetching characters", err);
          }
        } finally {
          setLoadingMore(false);
        }
      }, 300);
      return () => {
        clearTimeout(handler);
        controller.abort();
      };
    }

    if (offset === 0) {
      fetchCharacters(true);
      return () => controller.abort();
    } else {
      fetchCharacters();
      return () => controller.abort();
    }
  }, [search, offset, isSearching, showOnlyFavorites, initialCharacters]);

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

  useEffect(() => {
    if (!hasMore || showOnlyFavorites || isSearching) return;
    const loader = loaderRef.current;
    if (!loader) return;
    const observer = new window.IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loadingMore) {
        setOffset((prev) => prev + 15);
      }
    });
    observer.observe(loader);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, showOnlyFavorites, isSearching]);

  const displayedCharacters = characters ?? [];

  return (
    <>
      <LoadingBar loading={isLoading} />
      <div className={styles.mainPage}>
        {showOnlyFavorites && <h2 className={styles.favorites}>Favorites</h2>}
        <SearchBar
          value={search}
          numberOfResults={displayedCharacters.length}
          onSearchChange={setSearch}
        />
        {showOnlyFavorites && loadingFavorites ? (
          <p className={styles.loading}>Loading favorites...</p>
        ) : showOnlyFavorites && displayedCharacters.length === 0 ? (
          <p>0 Characters found</p>
        ) : (
          <>
            <CharactersList
              key={showOnlyFavorites ? "favorites" : "all"}
              characters={displayedCharacters}
              search={search}
            />
            {!showOnlyFavorites && hasMore && !isSearching && (
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
