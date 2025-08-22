"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface FavoriteContextType {
  favorites: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (id: number) => void;
  showOnlyFavorites: boolean;
  toggleShowOnlyFavorites: () => void;
}

const FavoritesContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const toggleShowOnlyFavorites = () => setShowOnlyFavorites((prev) => !prev);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (id: number) => setFavorites((prev) => [...prev, id]);
  const removeFavorite = (id: number) =>
    setFavorites((prev) => prev.filter((favId) => favId !== id));
  const toggleFavorite = (id: number) =>
    favorites.includes(id) ? removeFavorite(id) : addFavorite(id);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        showOnlyFavorites,
        toggleShowOnlyFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
};
