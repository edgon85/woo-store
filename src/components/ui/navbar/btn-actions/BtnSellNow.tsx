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
      className="hidden md:inline-flex items-center justify-center text-white bg-cerise-red-600 hover:bg-cerise-red-500 font-medium rounded-lg text-xs px-3 py-1.5 mr-2  focus:outline-none"
    >
      VENDER AHORA
    </button>
  );
};
