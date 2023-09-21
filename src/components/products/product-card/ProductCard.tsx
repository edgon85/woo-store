'use client';

import { useAuth } from '@/hooks';
import { IProduct } from '@/interfaces';
import { ImageComponent } from './ImageComponent';
import { UserProfile } from './UserProfile';
import { ProductInfo } from './ProductInfo';
import { ActionButton } from './ActionButton';

type Props = {
  product: IProduct;
};

/* const ActionButton = ({
  user,
  productUser,
}: {
  user: IUser | null;
  productUser: IUser | null;
}) => {
  let label = 'Editar';

  if (user === null || user?.id !== productUser?.id) {
    label = 'Comprar';
  }

  return (
    <div className="mt-2">
      <Button label={label} type="button" outlined={label === 'Editar'} />
    </div>
  );
}; */

export const ProductCard = ({ product }: Props) => {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow-md min-h-[400px]">
      <UserProfile user={product.user!} />
      <ImageComponent
        src={product.images[0]}
        alt={`Imagen de ${product.title}`}
        prodSlug={product.slug!}
      />
      <div className="p-2">
        <ProductInfo {...product} />
        <ActionButton
          user={user!}
          productUser={product.user!}
          product={product}
        />
      </div>
    </div>
  );
};

/* export const ProductCard = ({ product }: Props) => {
  const { user } = useAuth();

  return (
    <div className=" bg-white rounded-lg shadow-md  min-h-[400px]">
      <div className="w-full min-h-[300px] mb-2 relative cursor-pointer">
        <Image
          src={product.images[0]}
          alt={`Imagen de ${product.title}`}
          fill
          className="rounded-md"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: 'cover'
          }}
        />
      </div>
      <div className="pl-2 pr-2 pb-2">
        <div className="cursor-pointer">
          <h3 className="text-lg font-semibold capitalize">{product.title}</h3>
          <p className="text-gray-600">Q{product.price}</p>
          <p className="text-gray-500 capitalize">
            {' '}
            <span>Talla: {product.measurement.size}</span> |{' '}
            <span>{product.clothesState.title}</span>
          </p>
        </div>
        <p className="text-gray-500 capitalize">{product.brand.title}</p>
        {product.user?.id !== user?.id ? (
          <div className="mt-2">
            <Button label="Editar" type="button" outlined />
          </div>
        ) : (
          <div className="mt-2">
            <Button label="Comprar" type="button" />
          </div>
        )}
      </div>
    </div>
  );
}; */
