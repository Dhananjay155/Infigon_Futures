'use client';

import { useState, useEffect } from 'react';
import { getFavorites, toggleFavorite as toggleFav } from '@/lib/favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setFavorites(getFavorites());
    setIsLoaded(true);
  }, []);

  const toggleFavorite = (productId: number) => {
    const updated = toggleFav(productId);
    setFavorites(updated);
  };

  const isFavorite = (productId: number): boolean => {
    return favorites.includes(productId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    isLoaded,
  };
}