'use server';
import { ProductCard } from '@/components/products';
import { IProduct } from '@/interfaces';
import { cookies } from 'next/headers';

type Props = {
  products: IProduct[];
};

export const FeaturedArticles = ({ products }: Props) => {
  const currentUserId = cookies().get('userId')?.value;

  return (
    <div className='mt-8'>
      <h3 className="mb-4 text-2xl md:text-3xl">Artículos destacados</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product: IProduct) => (
          <ProductCard
            key={product.id}
            product={product}
            currentUserId={currentUserId || ''}
          />
        ))}
      </div>
    </div>
  );
};
