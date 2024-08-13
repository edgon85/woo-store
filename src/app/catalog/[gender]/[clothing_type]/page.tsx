import { getProductByGenderAndClothing } from '@/actions';
import { getAuthInfo } from '@/libs';
import NotFound from '../not-found';
import { Suspense } from 'react';
import ProductsSkeleton from '@/components/ui/skeletons';
import { Pagination, ProductCard } from '@/components';

type Props = {
  params: { gender: string; clothing_type: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ClothingTypePage({
  params: { gender, clothing_type },
  searchParams,
}: Props) {
  const userInfo = await getAuthInfo();
  const { id: currentUserId } = userInfo!;

  const page = Number(searchParams.page) || 1;

  const { products, totalPages } = await getProductByGenderAndClothing({
    gender: gender,
    clothingType: clothing_type,
    page,
  });

  if (products.length === 0) {
    return NotFound();
  }

  return (
    <div>
      {/* {queryString && <BadgeFilterList />} */}
      <Suspense fallback={<ProductsSkeleton />}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[500]">
          {products.map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
              currentUserId={currentUserId || ''}
            />
          ))}
        </div>
      </Suspense>
      <Pagination totalPages={totalPages} />
    </div>
  );
}
