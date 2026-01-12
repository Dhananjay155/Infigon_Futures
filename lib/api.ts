import { Product } from '@/types/product';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://fakestoreapi.com';

/**
 * Fetch all products
 * - Uses Next.js revalidation to allow static generation with periodic updates
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!res.ok) {
      console.error('fetchProducts: API returned non-OK status', res.status);
      return [];
    }

    return res.json();
  } catch (err) {
    console.error('fetchProducts error:', err);
    return [];
  }
}

/**
 * Fetch product categories
 */
export async function fetchCategories(): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/categories`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!res.ok) {
      console.error('fetchCategories: API returned non-OK status', res.status);
      return [];
    }

    return res.json();
  } catch (err) {
    console.error('fetchCategories error:', err);
    return [];
  }
}

/**
 * Fetch a single product by ID
 */
export async function fetchProduct(id: number): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!res.ok) {
      console.error('fetchProduct: Product not found', id);
      return null;
    }

    return res.json();
  } catch (err) {
    console.error('fetchProduct error:', err);
    return null;
  }
}
