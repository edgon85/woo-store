'use client';

import { useCreateProductStore } from '@/stores';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const BtnSellNow = () => {
  const resetCreateProdSt = useCreateProductStore((state) => state.resetStore);
  const router = useRouter();

  const onHandleClick = useCallback(() => {
    resetCreateProdSt();
    router.push('/products/create');
  }, [resetCreateProdSt, router]);

  return (
    <button
      onClick={onHandleClick}
      type="button"
      className="hidden md:inline-flex items-center justify-center text-white bg-gradient-to-r from-cerise-red-500 to-cerise-red-600 hover:bg-gradient-to-br hover:from-cerise-red-600 hover:to-cerise-red-700 font-medium rounded text-xs px-3 py-1.5 mr-2  focus:outline-none"
    >
      VENDER AHORA
    </button>
  );
};
