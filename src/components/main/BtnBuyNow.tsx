'use client';

import { useAuthStore, useCreateProductStore, useModalAuth } from '@/stores';
import { useRouter } from 'next/navigation';
import { Button } from '../ui';

export const BtnBuyNow = () => {
  const { isLoggedIn } = useAuthStore((state) => state);
  const resetCreateProdSt = useCreateProductStore((state) => state.resetStore);

  const { openModal } = useModalAuth();
  const router = useRouter();

  const handleBuyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoggedIn) {
      resetCreateProdSt();
      router.push(`/product/create`);
    } else {
      openModal();
    }
  };
  return (
    <button
      onClick={handleBuyClick}
      className=" text-white py-2 w-full rounded mb-2 font-semibold uppercase
      bg-gradient-to-r from-cerise-red-500 to-cerise-red-600 hover:bg-gradient-to-br hover:from-cerise-red-600 hover:to-cerise-red-700 text-sm focus:outline-none"
    >
      Vender ya
    </button>
  );
};
{
  /* 
  return <Button label="Vender ya" type="button" outlined onClick={handleBuyClick} />;
  
  */
}
