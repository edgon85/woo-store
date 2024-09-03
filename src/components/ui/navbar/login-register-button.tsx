'use client';

import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore, useCreateProductStore, useModalAuth } from '@/stores';

export const LoginRegisterButton = () => {
  const pathName = usePathname();
  const resetCreateProdSt = useCreateProductStore((state) => state.resetStore);
  const { isLoggedIn } = useAuthStore(
    useCallback((state) => ({ isLoggedIn: state.isLoggedIn }), [])
  );
  const router = useRouter();
  const { openModal } = useModalAuth();

  const onHandleClick = useCallback(() => {
    if (isLoggedIn) {
      resetCreateProdSt();
      router.push('/products/create');
    } else {
      openModal();
    }
  }, [isLoggedIn, resetCreateProdSt, router, openModal]);

  const shouldRenderButton = useMemo(() => {
    return (
      !pathName.includes('/auth/login') && !pathName.includes('/auth/register')
    );
  }, [pathName]);

  const buttonClasses = useMemo(() => {
    return clsx(
      'hidden md:flex justify-center items-center focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5',
      {
        'bg-white text-cerise-red-600 border border-cerise-red-600 hover:text-white hover:bg-cerise-red-500':
          !isLoggedIn,
        'bg-cerise-red-600 hover:bg-cerise-red-500 text-white': isLoggedIn,
      }
    );
  }, [isLoggedIn]);

  if (!shouldRenderButton) return null;

  return (
    <button onClick={onHandleClick} className={buttonClasses}>
      {isLoggedIn ? 'VENDER AHORA' : 'Inicia sesión | Regístrate'}
    </button>
  );
};
