'use client';

import { useModalAuth } from '@/stores';
import { usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export const BtnLoginRegister = () => {
  const pathName = usePathname();

  const { openModal } = useModalAuth();

  const onHandleClick = useCallback(() => {
    openModal();
  }, [openModal]);

  const shouldRenderButton = useMemo(() => {
    return (
      !pathName.includes('/auth/login') && !pathName.includes('/auth/register')
    );
  }, [pathName]);

  if (!shouldRenderButton) return null;

  return (
    <button
      onClick={onHandleClick}
      type="button"
      className="hidden md:inline-flex items-center justify-center bg-cerise-red-600 text-white hover:bg-cerise-red-500 font-medium rounded text-xs px-3 py-2.5 focus:outline-none "
    >
      Inicia sesión | Regístrate
    </button>
  );
};
