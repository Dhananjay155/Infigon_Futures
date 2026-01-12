import { fetchProducts, fetchCategories } from '@/lib/api';
import HomePageClient from '@/components/HomePageClient';

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  return <HomePageClient initialProducts={products} initialCategories={categories} />;
}
