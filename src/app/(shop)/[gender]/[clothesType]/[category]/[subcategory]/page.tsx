import { ProductCard } from '@/components';
import { fetchData } from '@/lib';
import { cookies } from 'next/headers';

export default async function SubcategoryPage({
  params: { subcategory },
}: {
  params: { subcategory: string };
}) {
  const products = await fetchData(`/products/subcategory/${subcategory}`);
  const currentUserId = cookies().get('userId')?.value;

  return (
    <div>
      {products.map((product: any) => (
        <ProductCard
          key={product.id}
          product={product}
          currentUserId={currentUserId || ''}
        />
      ))}
    </div>
  );
}
