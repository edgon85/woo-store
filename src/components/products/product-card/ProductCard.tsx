import { IProduct } from '@/interfaces';
import { ImageComponent } from './ImageComponent';
import { UserProfile } from './UserProfile';
import { ProductInfo } from './ProductInfo';
import { ActionButton } from './ActionButton';
import { checkImageAvailable } from '@/actions';

type Props = {
  product: IProduct;
  currentUserId: string;
};

export const ProductCard = async ({ product, currentUserId }: Props) => {
  const imageUrl = await checkImageAvailable(product.images[0]);

  return (
    <div className="bg-white rounded-lg shadow-md min-h-[400px]">
      <UserProfile user={product.user!} />
      <ImageComponent
        src={imageUrl ?? '/empty-image.svg'}
        alt={`Imagen de ${product.title}`}
        prodSlug={product.slug!}
      />
      <div className="p-2">
        <ProductInfo {...product} />
        <ActionButton product={product} currentUserId={currentUserId} />
      </div>
    </div>
  );
};
