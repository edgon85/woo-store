import { IProduct } from '@/interfaces';
import { ProductStatus } from '@/types';
import { translateProductStatus } from '@/utils';
import Link from 'next/link';

export const BtnBuyOrEdit = ({
  product,
  currentUserId,
}: {
  product: IProduct;
  currentUserId: string;
}) => {
  const { status } = product;

  if (status === ProductStatus.Available || status === ProductStatus.Hidden) {
    return (
      <div className="mt-2 w-full">
        {currentUserId !== product.user?.id ? (
          <Link
            className="bg-cerise-red-600 hover:bg-cerise-red-500 text-white text-sm rounded flex justify-center items-center px-4 py-2"
            href={`/checkout?transaction=${product.id}`}
          >
            Comprar
          </Link>
        ) : (
          <Link
            className="w-full border border-cerise-red-700 text-cerise-red-700 text-sm hover:bg-cerise-red-500 hover:text-white rounded flex justify-center items-center py-2"
            href={`/product/edit/${product.id}`}
          >
            Editar
          </Link>
        )}
      </div>
    );
  }

  return (
    <>
      <Link
        className="bg-green-600 hover:bg-green-400 text-white text-sm rounded flex justify-center items-center px-4 py-2 mt-2"
        href={`/settings/transactions/sales`}
      >
        {translateProductStatus(status)}
      </Link>
    </>
  );
};
