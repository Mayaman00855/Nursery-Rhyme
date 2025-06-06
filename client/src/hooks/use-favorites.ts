import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("rhyme-favorites");
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse favorites from localStorage:", error);
        setFavorites([]);
      }
    }
  }, []);

  const addToFavorites = (id: number) => {
    const newFavorites = [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem("rhyme-favorites", JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (id: number) => {
    const newFavorites = favorites.filter((fav) => fav !== id);
    setFavorites(newFavorites);
    localStorage.setItem("rhyme-favorites", JSON.stringify(newFavorites));
  };

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id);
    }
  };

  const isFavorite = (id: number) => favorites.includes(id);

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
  };
}
