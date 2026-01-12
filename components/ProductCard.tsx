'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export default function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
}: ProductCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <Link 
        href={`/products/${product.id}`} 
        className="block relative h-64 bg-gray-100 dark:bg-gray-700"
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </Link>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {product.title}
            </h3>
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(product.id);
            }}
            className="flex-shrink-0 text-2xl hover:scale-110 transition-transform"
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize mb-2">
          {product.category}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <span>⭐</span>
            <span>{product.rating.rate.toFixed(1)}</span>
            <span className="text-gray-400">({product.rating.count})</span>
          </div>
        </div>
      </div>
    </div>
  );
}