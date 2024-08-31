import Image from 'next/image';

import { IProduct } from '@/interfaces';
import { UserProfile } from './UserProfile';
import { checkImageAvailable } from '@/actions';
import { FaTag } from 'react-icons/fa';
import Link from 'next/link';
import { formatCurrency } from '@/utils';

type Props = {
  product: IProduct;
  currentUserId: string;
};

export const ProductCard = async ({ product, currentUserId }: Props) => {
  const imageUrl = await checkImageAvailable(product.images[0]);

  return (
    <div className="relative w-full max-w-md mx-auto border border-gray-200 rounded-lg">
      <div className="relative group">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={imageUrl ?? '/empty-image.svg'}
            width={800}
            height={800}
            alt={product.title}
            className="aspect-square object-cover w-full rounded-t-lg"
          />
        </Link>
        <div className="absolute top-2 right-2">
          <UserProfile user={product.user!} />
        </div>
      </div>
      <div className="space-y-2 bg-white rounded-b-lg p-2">
        <Link
          href={`/product/${product.slug}`}
          className="hover:text-cerise-red-600"
        >
          <h3 className="text-sm md:text-lg font-semibold capitalize">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm font-bold text-cerise-red-500">
              {formatCurrency(product.price * 100)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm text-gray-500">
              Talla:
            </span>
            <span className="font-medium uppercase text-gray-500">
              {product.measurement.size}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <FaTag className="h-4 w-4 text-gray-500" />
          <span className="text-gray-500">{product.brand.title}</span>
        </div>
      </div>
    </div>
  );
};

/* 
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
              <BtnBuyOrEdit product={product} currentUserId={currentUserId} />
            </Suspense>
          </div>
        )}
      </div>
    </div>

*/
