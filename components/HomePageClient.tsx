'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/types/product';
import { useFavorites } from '@/hooks/useFavorites';

import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import ProductGrid from '@/components/ProductGrid';
import ThemeToggle from '@/components/ThemeToggle';
import SortByPrice, { SortOption } from '@/components/SortByPrice';

interface HomePageClientProps {
  initialProducts: Product[];
  initialCategories: string[];
}

export default function HomePageClient({
  initialProducts,
  initialCategories,
}: HomePageClientProps) {
  const [products] = useState<Product[]>(initialProducts);
  const [categories] = useState<string[]>(initialCategories);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('none');

  const { favorites, toggleFavorite, isLoaded } = useFavorites();

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      const matchesFavorites =
        !showFavoritesOnly || favorites.includes(product.id);

      return matchesSearch && matchesCategory && matchesFavorites;
    });

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [
    products,
    searchQuery,
    selectedCategory,
    showFavoritesOnly,
    favorites,
    sortBy,
  ]);

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Product Explorer
            </h1>
            <ThemeToggle />
          </div>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            showFavoritesOnly={showFavoritesOnly}
            onToggleFavorites={() =>
              setShowFavoritesOnly((prev) => !prev)
            }
          />

          <SortByPrice value={sortBy} onChange={setSortBy} />
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredProducts.length} of {products.length} products
        </div>

        <ProductGrid
          products={filteredProducts}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      </main>
    </div>
  );
}
