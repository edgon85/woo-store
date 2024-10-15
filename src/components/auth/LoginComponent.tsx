'use client';

import { useEffect, useState } from 'react';
import { LoginForm } from '../forms';
import { usePathname, useSearchParams } from 'next/navigation';

import { AuthButtonsProviders } from './AuthButtonsProviders';
import Link from 'next/link';

type Props = {
  providers: any;
};

export const LoginComponent = ({ providers }: Props) => {
  const [selectEmail, setSelectEmail] = useState(false);
  const [error, setError] = useState('');
  const params = useSearchParams();

  const pathName = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('p');
  const myQuery = query !== null ? `?p=${query}` : '';

  useEffect(() => {
    if (params.get('error') !== null) {
      setSelectEmail(true);
    }
    setError(params.get('error')!);
  }, [error, params]);

  return (
    <div className="bg-white py-4 rounded flex flex-col items-center gap-2 max-w-md w-full">
      <h2 className="text-lg mb-3">Bienvenido a Woo</h2>
      <div className="flex flex-col w-full gap-2">
        <AuthButtonsProviders providers={providers} title="iniciar con" />
      </div>

      <div className="mt-2">
        <span>O inicia con</span>{' '}
        <button
          onClick={() => setSelectEmail((prev) => !prev)}
          className="text-primary cursor-pointer"
        >
          E-MAIL
        </button>
      </div>

      {error && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          <span className="font-medium">Error</span> correo / contraseña
          incorrecto
        </div>
      )}
      {selectEmail && <LoginForm />}

      {pathName.includes('auth/login') && (
        <div className="mt-4 text-center">
          <span className="text-sm">¿no tienes cuenta? </span>
          <Link
            href={`/auth/register${myQuery}`}
            className="text-primary underline text-sm"
          >
            Registrarse
          </Link>
        </div>
      )}
    </div>
  );
};
