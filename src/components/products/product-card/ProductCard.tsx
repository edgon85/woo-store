import { Button } from '@/components/ui';
import Image from 'next/image';

type cardProps = {
  imageUrl: string;
  name: string;
  price: string;
  description: string;
};
export const ProductCard = ({ imageUrl, name, price }: cardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md  min-h-[400px]">
      <div className="w-full min-h-[300px] mb-2 relative">
        <Image
          src={imageUrl}
          alt={`Imagen de ${name}`}
          fill
          className="rounded-md"
        />
      </div>
      <div className="pl-2 pr-2 pb-2">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">{price}</p>
        <p className="text-gray-500">
          {' '}
          <span>Talla: L</span> | <span>Usado</span>
        </p>
        <p className="text-gray-500"> The north face</p>
        <div className="mt-2">
          <Button label="Comprar" type="button" />
        </div>
      </div>
    </div>
  );
};
