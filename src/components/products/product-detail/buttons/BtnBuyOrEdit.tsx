'use client';
import { IProduct } from '@/interfaces';
import { ProductStatus } from '@/enums';
import { translateProductStatus } from '@/utils';
import Link from 'next/link';
import { useAuthStore, useModalAuth } from '@/stores';

import { useRouter } from 'next/navigation';

export const BtnBuyOrEdit = ({
  product,
  currentUserId,
}: {
  product: IProduct;
  currentUserId: string;
}) => {
  const { status } = product;
  const { openModal } = useModalAuth();
  const { isLoggedIn } = useAuthStore((state) => state);
  const router = useRouter();

  const handleBuyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoggedIn) {
      router.push(`/checkout?transaction=${product.id}`);
    } else {
      openModal();
    }
  };

  if (status === ProductStatus.Available || status === ProductStatus.Hidden) {
    return (
      <div className="mt-2 w-full">
        {currentUserId !== product.user?.id ? (
          <button
            onClick={handleBuyClick}
            className="bg-cerise-red-600 hover:bg-cerise-red-500 text-white text-sm rounded flex justify-center items-center px-4 py-2 w-full"
          >
            Comprar
          </button>
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
    <Link
      className="bg-green-600 hover:bg-green-400 text-white text-sm rounded flex justify-center items-center px-4 py-2 mt-2"
      href={`/settings/transactions/sales`}
    >
      {translateProductStatus(status)}
    </Link>
  );
};
