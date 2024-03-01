import { getRelatedProducts } from '@/actions';
import { IProduct } from '@/interfaces';
import { ProductCard } from '../product-card';

type Props = {
  productSlug: string;
  currentUserId: string;
};

export const RelatedProducts = async ({
  productSlug,
  currentUserId,
}: Props) => {
  const products = (await getRelatedProducts(productSlug)) as IProduct[];

  if (products.length === 0) {
    return <div className="h-96"></div>;
  }

  return (
    <div className="p-4 pt-4 mt-8">
      <h2 className="text-base font-semibold mb-4 mt-4">
        Productos Relacionados
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            product={product}
            currentUserId={currentUserId || ''}
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
};
