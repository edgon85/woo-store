import { BadgeFilterList, ProductCard } from '@/components';
import { IProduct } from '@/interfaces';
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

  const url = queryString
    ? `/products/filter?gender=${gender}&category=${category}&${queryString}`
    : `/products?gender=${gender}&category=${category}`;

  const products = (await fetchData(url)) as IProduct[];

  if (products.length === 0) {
    return (
      <div className="w-full mt-10 md:mt-10 flex flex-col justify-center items-center">
        <picture>
          <img
            src="/blank_canvas.svg"
            alt="Imagen de no hay productos disponibles"
            className="max-w-80"
          />
        </picture>
        <p className="text-lg">Aun no hay productos disponibles</p>
      </div>
    );
  }

  return (
    <div>
      {queryString && <BadgeFilterList />}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product: any) => (
          <ProductCard
            key={product.id}
            product={product}
            currentUserId={currentUserId || ''}
          />
        ))}
      </div>
    </div>
  );
}
