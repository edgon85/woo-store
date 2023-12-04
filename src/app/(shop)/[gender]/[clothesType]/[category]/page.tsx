import { ProductCard } from '@/components';
import { fetchData } from '@/lib';
import { buildQueryString } from '@/utils';
import { cookies } from 'next/headers';

export default async function CategoriesPage({
  params: { gender, category },
  searchParams,
}: {
  params: { gender: string; category: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentUserId = cookies().get('userId')?.value;

  const queryString = buildQueryString(searchParams);

  /* TODO: usar esta url para las peticiones  */
  const url = queryString
    ? `/products/filter?gender=${gender}&category=${category}&${queryString}`
    : `/products?gender=${gender}&category=${category}`;

  const products = await fetchData(
    `/products?gender=${gender}&category=${category}`
  );

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
