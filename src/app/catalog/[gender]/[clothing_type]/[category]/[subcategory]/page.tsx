import { getProductBySubcategory } from '@/actions';
import { Pagination, ProductCard } from '@/components';
import { getAuthInfo } from '@/libs';

import { Suspense } from 'react';
import ProductsSkeleton from '@/components/ui/skeletons';
import NotFound from '../../../not-found';

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
  params: { subcategory },
  searchParams,
}: Props) {
  const userInfo = await getAuthInfo();
  const { id: currentUserId } = userInfo!;

  const page = Number(searchParams.page) || 1;

  const { products, totalPage } = await getProductBySubcategory({
    subcategory,
    page,
  });

  console.log(products);

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
      <Pagination totalPages={totalPage} />
    </div>
  );
}
