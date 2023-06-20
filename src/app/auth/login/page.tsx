'use client';

import { BtnSocial, FacebookIcon, GoogleIcon, LoginForm } from '@/components';
import { useState } from 'react';

export default function LoginPage() {
  const [selectEmail, setSelectEmail] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-4 rounded flex flex-col justify-center items-center gap-2 min-w-[90%] md:min-w-[50%] lg:min-w-[30%] shadow-md">
        <h2 className="text-lg mb-3">Bienvenido a Woo</h2>
        <div className="flex flex-col w-full gap-2">
          <BtnSocial
            icon={<GoogleIcon />}
            title="iniciar con google"
            provider="google"
          />
          <BtnSocial
            icon={<FacebookIcon />}
            title="iniciar con facebook"
            provider="facebook"
          />
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

        {selectEmail && <LoginForm />}
      </div>
    </div>
  );
}
