'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect, useSearchParams } from 'next/navigation';

import {
  BtnSocial,
  RegisterForm,
} from '@/components';
import { useAuth } from '@/hooks';

const RegisterPage = () => {
  const [selectEmail, setSelectEmail] = useState(false);
  const params = useSearchParams();
  const { providers } = useAuth();

  const query = params.get('p');

  const { status } = useSession();

  if (status === 'loading') return <p>Loading...</p>;

  if (status === 'authenticated') {
    redirect(`${query !== null ? query : '/'}`);
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-4 rounded flex flex-col justify-center items-center gap-2 min-w-[90%] md:min-w-[50%] lg:min-w-[30%] shadow-md">
        <h2 className="text-lg mb-3">Regístrate en Woo</h2>
        <div className="flex flex-col w-full gap-2">
          {Object.values(providers).map((provider: any) => {
            if (provider.id === 'credentials') {
              return <div key={'credentials'}></div>;
            }

            return (
              <BtnSocial
                key={provider.id}
                title={`registrarse con ${provider.name}`}
                provider={provider.id}
              />
            );
          })}
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
      </div>
    </div>
  );
};

export default RegisterPage;
