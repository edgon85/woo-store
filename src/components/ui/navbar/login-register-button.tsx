'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore, useModalAuth } from '@/stores';

import clsx from 'clsx';

export const LoginRegisterButton = () => {
  const pathName = usePathname();
  
  const { isLoggedIn } = useAuthStore((state) => state);
  const router = useRouter();
  const { openModal } = useModalAuth();

  const onHandleClick = () => {
    if (isLoggedIn) {
      router.push('/products/create');
    } else {
      openModal();
    }
  };

  return (
    <>
      {pathName.includes('/auth/login') ||
      pathName.includes('/auth/register') ? null : (
        <button
          onClick={onHandleClick}
          className={clsx(
            'hidden md:flex justify-center items-center focus:outline-none  bg-cerise-red-600 hover:bg-cerise-red-500 font-medium rounded-lg text-sm px-5 py-2.5',
            {
              'bg-white text-cerise-red-600 border border-cerise-red-600 hover:text-white':
                !isLoggedIn,
              'text-white': isLoggedIn,
            }
          )}
        >
          {isLoggedIn ? 'VENDER AHORA' : 'Inicia sesión | Regístrate'}
        </button>
      )}
    </>
  );
};
