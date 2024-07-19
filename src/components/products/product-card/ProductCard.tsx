import { IProduct } from '@/interfaces';
import { ImageComponent } from './ImageComponent';
import { UserProfile } from './UserProfile';
import { ProductInfo } from './ProductInfo';
import { checkImageAvailable } from '@/actions';
import { ProductStatus } from '@/enums';
import { Suspense } from 'react';
import { DynamicBtnBuyOrEdit, ButtonSkeleton } from '@/components';

type Props = {
  product: IProduct;
  currentUserId: string;
};

export const ProductCard = async ({ product, currentUserId }: Props) => {
  const imageUrl = await checkImageAvailable(product.images[0]);

  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col h-full">
      <div className="p-2">
        <UserProfile user={product.user!} />
      </div>
      <ImageComponent
        src={imageUrl ?? '/empty-image.svg'}
        alt={`Imagen de ${product.title}`}
        prodSlug={product.slug!}
      />
      <div className="p-2 flex flex-col flex-grow">
        <div className="flex-grow">
          <ProductInfo {...product} />
        </div>
        {product.status === ProductStatus.Available && (
          <div className="mt-auto">
            <Suspense fallback={<ButtonSkeleton />}>
              <DynamicBtnBuyOrEdit
                product={product}
                currentUserId={currentUserId}
              />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
};
