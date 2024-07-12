'use client';

import { useState } from 'react';
import { RegisterForm } from '../forms';

import { AuthButtonsProviders } from './AuthButtonsProviders';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

type Props = {
  providers: any;
};

export const RegisterComponent = ({ providers }: Props) => {
  const [selectEmail, setSelectEmail] = useState(false);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('p');
  const myQuery = query !== null ? `?p=${query}` : '';

  return (
    <div className="bg-white p-4 rounded flex flex-col items-center gap-2 max-w-md w-full">
      <h2 className="text-lg mb-3">Regístrate en Woo</h2>
      <div className="flex flex-col w-full gap-2">
        <AuthButtonsProviders title="registrarse con" providers={providers} />
      </div>

      <div className="mt-4">
        <span>O Regístrate con</span>{' '}
        <button
          onClick={() => setSelectEmail((prev) => !prev)}
          className="text-primary cursor-pointer"
        >
          E-MAIL
        </button>
      </div>

      {selectEmail && <RegisterForm />}
      {pathName.includes('/auth/register') && (
        <div className="mt-4 text-center">
          <span className="text-sm">¿ya tienes cuenta? </span>
          <Link
            href={`/auth/login${myQuery}`}
            className="text-primary underline text-sm"
          >
            Iniciar sesión
          </Link>
        </div>
      )}
    </div>
  );
};
