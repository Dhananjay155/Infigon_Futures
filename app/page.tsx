import { fetchProducts, fetchCategories } from '@/lib/api';
import HomePageClient from '@/components/HomePageClient';
import ErrorState from '@/components/ErrorState';

export default async function HomePage() {
  try {
    const [products, categories] = await Promise.all([
      fetchProducts(),
      fetchCategories()
    ]);

    // Check if data is valid
    if (!products || products.length === 0) {
      console.error('No products fetched');
    }

    return (
      <HomePageClient
        initialProducts={products || []}
        initialCategories={categories || []}
      />
    );
  } catch (error) {
    console.error('Error in HomePage:', error);
    
    // Return a client component that shows error
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <ErrorState 
            message="Failed to load products. Please check the API connection." 
          />
        </div>
      </div>
    );
  }
}