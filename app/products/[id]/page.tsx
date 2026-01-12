// app/products/[id]/page.tsx
import ProductDetailClient from '@/components/ProductDetailClient';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  return <ProductDetailClient productId={params.id} />;
}