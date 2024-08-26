import { Pagination, ProductCard } from '@/components';
import { getAuthInfo } from '@/libs';
import { getSearchProducts } from '@/utils';
import { redirect } from 'next/navigation';
import NotFound from './not-found';
import { Suspense } from 'react';
import ProductsSkeleton from '@/components/ui/skeletons';
import { Metadata } from 'next';

type Props = {
  searchParams: {
    s: string;
    gender: string;
    clothesType: string;
    category?: string;
    subcategory?: string;
  };
};

export const metadata: Metadata = {
  title: 'Prendas',
};

export default async function Page({ searchParams }: Props) {
  const { s: query, gender, clothesType, category, subcategory } = searchParams;

  const userInfo = await getAuthInfo();
  const { id: currentUserId } = userInfo!;
  let products, totalPages, activeFilters;

  try {
    const result = await getSearchProducts(
      { searchTerm: query, gender, clothesType, category, subcategory },
      searchParams
    );
    ({ products, totalPages, activeFilters } = result);
  } catch (error) {
    console.error('Error fetching products:', error);

    redirect('/');
  }

  if (products.length === 0) {
    return NotFound();
  }

  return (
    <div>
      {/* {activeFilters.length > 0 && <BadgeFilterList />} */}
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
