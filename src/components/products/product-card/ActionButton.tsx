import { IProduct } from '@/interfaces';
import Link from 'next/link';

export const ActionButton = ({
  product,
  currentUserId,
}: {
  product: IProduct;
  currentUserId: string;
}) => {
  return (
    <div className="mt-2 w-full">
      {currentUserId !== product.user?.id ? (
        <Link
          className="bg-cerise-red-600 text-white rounded flex justify-center items-center px-4 py-2"
          href={`/checkout?transaction=${product.id}`}
        >
          Comprar
        </Link>
      ) : (
        <Link href={`/product/edit/${product.id}`}>Editar</Link>
      )}
    </div>
  );
};
