'use client';

import { useAuthStore, useModalAuth } from '@/stores';
import { useRouter } from 'next/navigation';

export const BtnBuyNow = () => {
  const { isLoggedIn } = useAuthStore((state) => state);
  const { openModal } = useModalAuth();
  const router = useRouter();

  const handleBuyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoggedIn) {
      router.push(`/products/create`);
    } else {
      openModal();
    }
  };
  return (
    <button
      onClick={handleBuyClick}
      className="bg-cerise-red-600 text-white py-3 w-full rounded-md mb-2 font-bold"
    >
      Vender ya
    </button>
  );
};
