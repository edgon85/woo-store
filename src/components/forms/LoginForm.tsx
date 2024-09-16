'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';

import { isEmail } from '@/utils';
import { useState } from 'react';
import { SpinnerIcon } from '../ui';
import { useModalAuth } from '@/stores';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type FormData = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { closeModal } = useModalAuth();
  const path = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onLoginUser = async ({ email, password }: FormData) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false, // Do not redirect to the page after login
        email,
        password,
      });

      if (path.includes('auth/login') && result?.ok) {
        const query = searchParams.get('p');
        router.replace(query || '/');
        return;
      }

      if (result?.status === 200) {
        router.refresh();
      }

      if (result?.error) {
        setError('Email o contraseña incorrectos');
      } else {
        closeModal();
      }
    } catch (error) {
      setError('Ocurrió un error inesperado');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClassName = (fieldError?: string) => `
    block w-full p-4 rounded-md sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none
    ${
      fieldError
        ? 'bg-red-50 border border-red-500 text-red-900'
        : 'border border-divider text-gray-900'
    }
  `;

  return (
    <div className="w-full">
      {error && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          <span className="font-medium">Error:</span> {error}
        </div>
      )}
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        {[
          {
            name: 'email',
            label: 'Correo',
            type: 'email',
            placeholder: 'user@correo.com',
          },
          {
            name: 'password',
            label: 'Contraseña',
            type: 'password',
            placeholder: 'contraseña',
          },
        ].map((field) => (
          <div key={field.name} className="mb-3">
            <label
              htmlFor={field.name}
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              className={inputClassName(
                errors[field.name as keyof FormData]?.message
              )}
              placeholder={field.placeholder}
              disabled={isLoading}
              {...register(field.name as keyof FormData, {
                required: 'Este campo es requerido',
                ...(field.name === 'email' && { validate: isEmail }),
                ...(field.name === 'password' && {
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                }),
              })}
            />
            {errors[field.name as keyof FormData] && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors[field.name as keyof FormData]?.message}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="bg-primary w-full py-2 text-xs md:text-sm text-white uppercase rounded-md shadow-md cursor-pointer disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <SpinnerIcon className="w-6 h-6 animate-spin" />
            </span>
          ) : (
            'Iniciar sesión'
          )}
        </button>
      </form>
      <div className="mt-6 w-full bg-background rounded p-2 text-center">
        <span className="text-xs md:text-sm">¿Ha olvidado su contraseña? </span>
        <Link
          href="/"
          className={`text-primary underline text-xs md:text-sm uppercase ${
            isLoading ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          recuperar
        </Link>
      </div>
    </div>
  );
};
