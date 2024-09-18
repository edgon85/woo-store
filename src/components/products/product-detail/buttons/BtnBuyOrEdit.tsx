'use client';
import { IProduct } from '@/interfaces';
import { ProductStatus } from '@/enums';
import { translateProductStatus } from '@/utils';
import Link from 'next/link';
import { useAuthStore, useCreateProductStore, useModalAuth } from '@/stores';

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
  const resetCreateProdSt = useCreateProductStore((state) => state.resetStore);
  const router = useRouter();

  const handleBuyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoggedIn) {
      router.push(`/checkout?transaction=${product.id}`);
    } else {
      openModal();
    }
  };

  const handleEditClick = (prodId: string) => {
    resetCreateProdSt();
    router.push(`/product/edit/${prodId}`);
  };

  if (status === ProductStatus.Available || status === ProductStatus.Hidden) {
    return (
      <div className="w-full">
        {currentUserId !== product.user?.id ? (
          <button
            onClick={handleBuyClick}
            className="border border-cerise-red-600 md:border-none bg-gradient-to-r from-cerise-red-500 to-cerise-red-600 hover:bg-gradient-to-br hover:from-cerise-red-600 hover:to-cerise-red-700 text-white text-sm rounded flex justify-center items-center px-4 py-2 w-full"
          >
            Comprar
          </button>
        ) : (
          <button
            className="w-full border border-cerise-red-600 text-cerise-red-600 text-sm hover:bg-gradient-to-br hover:from-cerise-red-600 hover:to-cerise-red-700 hover:text-white hover:border-none rounded flex justify-center items-center px-4 py-2"
            onClick={() => handleEditClick(product.id!)}
          >
            Editar
          </button>
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
