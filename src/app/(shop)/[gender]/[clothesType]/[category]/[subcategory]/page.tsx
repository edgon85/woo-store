import {
  getProductByGenderAndCategory,
  getProductBySubcategory,
} from '@/actions';
import { BadgeFilterList, Pagination, ProductCard } from '@/components';
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

  const data = await getProductBySubcategory({
    take: 15,
    gender,
    subcategory,
    queryString,
  });
  const { products, totalPage } = data;

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
    <>
      {queryString && <BadgeFilterList />}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[500]">
        {products.map((product: any) => (
          <ProductCard
            key={product.id}
            product={product}
            currentUserId={currentUserId || ''}
          />
        ))}
      </div>
      <Pagination totalPages={totalPage} />
    </>
  );
}
