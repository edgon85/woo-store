'use client';

import { useAuthStore, useCreateProductStore, useModalAuth } from '@/stores';
import { useRouter } from 'next/navigation';

export const BtnBuyNow = () => {
  const { isLoggedIn } = useAuthStore((state) => state);
  const resetCreateProdSt = useCreateProductStore((state) => state.resetStore);

  const { openModal } = useModalAuth();
  const router = useRouter();

  const handleBuyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoggedIn) {
      resetCreateProdSt();
      router.push(`/products/create`);
    } else {
      openModal();
    }
  };
  return (
    <button
      onClick={handleBuyClick}
      className="bg-cerise-red-600 text-white py-3 w-full rounded mb-2 font-bold uppercase"
    >
      Vender ya
    </button>
  );
};
