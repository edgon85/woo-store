'use client';
import { useAuth } from '@/hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export const LoginRegisterButton = () => {
  const path = usePathname();
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Link
        href={isLoggedIn ? '/products/create' : `/auth/login?p=${path}`}
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
      </Link>
    </>
  );
};
