import { getProductBySubcategory } from '@/actions';
import { Pagination, ProductCard } from '@/components';
import { getAuthInfo } from '@/libs';

type Props = {
  params: {
    gender: string;
    clothing_type: string;
    category: string;
    subcategory: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function SubcategoryPage({
  params: { gender, clothing_type, category, subcategory },
  searchParams,
}: Props) {
  const userInfo = await getAuthInfo();
  const { id: currentUserId } = userInfo!;

  const { products, totalPage } = await getProductBySubcategory({
    take: 1,
    gender,
    subcategory,
  });

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
      {/* {queryString && <BadgeFilterList />} */}
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
