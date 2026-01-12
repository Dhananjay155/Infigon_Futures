'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { fetchProductById } from '@/lib/api';
import { useFavorites } from '@/hooks/useFavorites';
import ErrorState from '@/components/ErrorState';
import ThemeToggle from '@/components/ThemeToggle';

interface ProductDetailClientProps {
  productId: string;
}

export default function ProductDetailClient({ productId }: ProductDetailClientProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { favorites, toggleFavorite, isFavorite, isLoaded } = useFavorites();

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProductById(productId);
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  if (loading || !isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
          <div className="animate-pulse">
            <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-8" />
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                  <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                  <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
          <ErrorState message={error || 'Product not found'} onRetry={loadProduct} />
        </div>
      </div>
    );
  }

  const productIsFavorite = isFavorite(product.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Products
          </Link>
          <ThemeToggle />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="relative h-96 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-8"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {product.title}
                </h1>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="flex-shrink-0 text-3xl hover:scale-110 transition-transform"
                  aria-label={productIsFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {productIsFavorite ? '❤️' : '🤍'}
                </button>
              </div>

              <div className="inline-block">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full capitalize">
                  {product.category}
                </span>
              </div>

              <div className="flex items-center gap-4 my-6">
                <span className="text-4xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-2 text-lg">
                  <span>⭐</span>
                  <span className="font-semibold">{product.rating.rate.toFixed(1)}</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    ({product.rating.count} reviews)
                  </span>
                </div>
              </div>

              <div className="border-t dark:border-gray-700 pt-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Description
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mt-auto pt-8">
                <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}