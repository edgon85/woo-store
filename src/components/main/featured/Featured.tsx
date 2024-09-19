'use server';

import { ProductCard, CardsSkeleton } from '@/components';
import { IProduct } from '@/interfaces';
import { getAuthInfo } from '@/libs';
import { Suspense } from 'react';

type Props = {
  products: IProduct[];
};

export const FeaturedArticles = async ({ products }: Props) => {
  const userInfo = await getAuthInfo();
  const { id: currentUserId } = userInfo!;

  return (
    <section className="main-wrapper px-4 lg:px-0">
      <div className="mt-8">
        <h2 className="mb-4 text-2xl md:text-3xl">Artículos destacados</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
          <Suspense fallback={<CardsSkeleton />}>
            {products.length > 0 ? (
              products.map((product: IProduct) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currentUserId={currentUserId}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No hay artículos destacados disponibles en este momento.
              </p>
            )}
          </Suspense>
        </div>
      </div>
    </section>
  );
};
