'use client';
import { Button } from '@/components/ui';
import { useAuth } from '@/hooks';
import { IProduct } from '@/interfaces';
import Image from 'next/image';

type Props = {
  product: IProduct;
};

export const ProductCard = ({ product }: Props) => {
  const { user } = useAuth();

  return (
    <div className=" bg-white rounded-lg shadow-md  min-h-[400px]">
      <div className="w-full min-h-[300px] mb-2 relative cursor-pointer">
        <Image
          src={product.images[0]}
          alt={`Imagen de ${product.title}`}
          fill
          className="rounded-md"
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
};
