import { getProductByGenderAndCategory } from '@/actions';
import {
  BadgeFilterList,
  CardsSkeleton,
  Pagination,
  ProductCard,
} from '@/components';
import { getAuthInfo } from '@/libs';
import { buildQueryString } from '@/utils';
import NotFound from '../../not-found';
import { Suspense } from 'react';
import ProductsSkeleton from '@/components/ui/skeletons';

type Props = {
  params: { gender: string; clothing_type: string; category: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function CategoryPage({
  params: { gender, clothing_type, category },
  searchParams,
}: Props) {
  const userInfo = await getAuthInfo();
  const { id: currentUserId } = userInfo!;

  const page = Number(searchParams.page) || 1;

  const { products, totalPages } = await getProductByGenderAndCategory({
    gender: gender,
    category: category,
    page,
    pageSize: 2,
  });

  if (products.length === 0) {
    NotFound();
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
