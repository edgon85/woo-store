import { Button } from '@/components/ui';
import { IProductPlain } from '@/interfaces';
import Image from 'next/image';

type cardProps = {
  product: IProductPlain;
  userId?: string;
};
export const ProductCard = ({ product, userId }: cardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md  min-h-[400px]">
      <div className="w-full min-h-[300px] mb-2 relative">
        <Image
          src={product.images[0]}
          alt={`Imagen de ${product.title}`}
          fill
          className="rounded-md"
        />
      </div>
      <div className="pl-2 pr-2 pb-2">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-gray-600">Q{product.price}</p>
        <p className="text-gray-500">
          {' '}
          <span>Talla: {product.size}</span> | <span>{product.state}</span>
        </p>
        <p className="text-gray-500">{product.brand}</p>
        {product.user === userId ? (
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