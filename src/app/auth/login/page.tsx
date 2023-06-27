'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect, useSearchParams } from 'next/navigation';

import { BtnSocial, LoginForm } from '@/components';
import { useAuth } from '@/hooks';

export default function LoginPage() {
  const [selectEmail, setSelectEmail] = useState(false);

  const { providers } = useAuth();

  const { status } = useSession();
  const params = useSearchParams();

  const [error, setError] = useState('');

  const query = params.get('p');

  useEffect(() => {
    if (params.get('error') !== null) {
      setSelectEmail(true);
    }
    setError(params.get('error')!);
    // setSuccess(params.get('success')!);
  }, [error, params]);

  if (status === 'loading') return <p>Loading...</p>;

  if (status === 'authenticated') {
    redirect(`${query !== null ? query : '/'}`);
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-4 rounded flex flex-col justify-center items-center gap-2 min-w-[90%] md:min-w-[50%] lg:min-w-[30%] shadow-md">
        <h2 className="text-lg mb-3">Bienvenido a Woo</h2>
        <div className="flex flex-col w-full gap-2">
          {Object.values(providers).map((provider: any) => {
            if (provider.id === 'credentials') {
              return <div key={'credentials'}></div>;
            }

            return (
              <BtnSocial
                key={provider.id}
                title={`iniciar con ${provider.name}`}
                provider={provider.id}
              />
            );
          })}
        </div>

        <div className="mt-4">
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
      </div>
    </div>
  );
}
