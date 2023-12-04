import { ProductCard } from '@/components';
import { fetchData } from '@/lib';
import { cookies } from 'next/headers';

export default async function CategoriesPage({
  params: { gender, category },
}: {
  params: { gender: string; category: string };
}) {
  // const products = await getProductByGenderAndCategory(gender, category);
  const products = await fetchData(
    `/products?gender=${gender}&category=${category}`
  );
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
