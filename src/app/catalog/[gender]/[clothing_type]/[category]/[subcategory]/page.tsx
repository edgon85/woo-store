import {
  BadgeFilterList,
  NotProductFound,
  Pagination,
  ProductCard,
} from '@/components';
import { getAuthInfo } from '@/libs';
import { Suspense } from 'react';
import ProductsSkeleton from '@/components/ui/skeletons';
import { generateDynamicMetadata, getFilteredProducts } from '@/utils';
import ErrorPage from '../../../error';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: {
    gender: string;
    clothing_type: string;
    category: string;
    subcategory: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return generateDynamicMetadata(props, parent);
}

export default async function SubcategoryPage({
  params: { gender, clothing_type, category, subcategory },
  searchParams,
}: Props) {
  const userInfo = await getAuthInfo();
  const { id: currentUserId } = userInfo!;

  let products, totalPages, activeFilters;

  try {
    const result = await getFilteredProducts(
      {
        gender,
        clothesType: clothing_type,
        category,
        subcategory,
      },
      searchParams
    );
    ({ products, totalPages, activeFilters } = result);
  } catch (error) {
    console.error('Error fetching products:', error);
    return <ErrorPage error={error as Error} />;
  }

  if (products.length === 0) {
    return NotProductFound();
  }

  return (
    <div>
      {activeFilters && <BadgeFilterList />}
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
