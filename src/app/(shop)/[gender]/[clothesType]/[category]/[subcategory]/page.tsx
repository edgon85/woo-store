import { BadgeFilterList, ProductCard } from '@/components';
import { fetchData } from '@/lib';
import { buildQueryString } from '@/utils';
import { cookies } from 'next/headers';

export default async function SubcategoryPage({
  params: { gender, clothesType, category, subcategory },
  searchParams,
}: {
  params: {
    gender: string;
    clothesType: string;
    category: string;
    subcategory: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentUserId = cookies().get('userId')?.value;

  const queryString = buildQueryString(searchParams);

  const url = queryString
    ? `/products/filter?gender=${gender}&subcategory=${subcategory}&${queryString}`
    : `/products/subcategory/${subcategory}`;

  const products = await fetchData(url);

  return (
    <>
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
    </>
  );
}
