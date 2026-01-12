export const dynamic = 'force-dynamic';

import { fetchProducts, fetchCategories } from '@/lib/api';
import HomePageClient from '@/components/HomePageClient';

export default async function HomePage() {
  const products = await fetchProducts();
  const categories = await fetchCategories();

  return (
    <HomePageClient
      initialProducts={products}
      initialCategories={categories}
    />
  );
}
