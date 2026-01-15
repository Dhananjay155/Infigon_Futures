import { Product } from '@/types/product';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://fakestoreapi.com';

export async function fetchProducts(): Promise<Product[]> {
  try {
    console.log('Fetching products from:', `${API_BASE_URL}/products`);
    const res = await fetch(`${API_BASE_URL}/products`, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log('Response status:', res.status);
    
    if (!res.ok) {
      console.error('API Error:', res.statusText);
      return [];
    }
    
    const data = await res.json();
    console.log('Products fetched:', data.length);
    return data;
  } catch (err) {
    console.error('fetchProducts error:', err);
    return [];
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/categories`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error('fetchCategories error:', err);
    return [];
  }
}

export async function fetchProduct(id: number): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Product not found');
  }

  return res.json();
}
