import { Product } from '@/types/product';

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products', {
    cache: 'no-store', 
  });

  if (!res.ok) return [];
  return res.json();
}

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch('https://fakestoreapi.com/products/categories', {
    cache: 'no-store', 
  });

  if (!res.ok) return [];
  return res.json();
}

export async function fetchProduct(id: number): Promise<Product | null> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: 'no-store', 
  });

  if (!res.ok) return null;
  return res.json();
}
