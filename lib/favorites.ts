const FAVORITES_KEY = 'product-favorites';

export function getFavorites(): number[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
}

export function saveFavorites(favorites: number[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
}

export function toggleFavorite(productId: number): number[] {
  const favorites = getFavorites();
  const index = favorites.indexOf(productId);
  
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(productId);
  }
  
  saveFavorites(favorites);
  return favorites;
}

export function isFavorite(productId: number): boolean {
  return getFavorites().includes(productId);
}