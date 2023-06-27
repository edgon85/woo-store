'use client'

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';

import { isEmail } from '@/utils';
import { useSearchParams } from 'next/navigation';


type FormData = {
  email: string;
  password: string;
};

export const LoginForm = () => {

  const searchParams = useSearchParams();
  const query = searchParams.get('p');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const myQuery = query !== null ? `?p=${query}` : '';
  const onLoginUser = ({ email, password }: FormData) => {
    signIn('credentials', {
      email,
      password,
    });
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <div className="mb-3">
          <label
            htmlFor="large-input"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Correo
          </label>
          <input
            type="email"
            id="large-input"
            className={`block w-full p-4  ${
              !errors.email
                ? 'border border-divider text-gray-900'
                : 'bg-red-50 border border-red-500 text-red-900'
            } rounded-md  sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none`}
            // className="block w-full p-4 text-gray-900 border border-divider rounded-md  sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
            placeholder="user@correo.com"
            {...register('email', {
              required: 'Este campo es requerido',
              validate: isEmail,
            })}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="password-input"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password-input"
            // className="block w-full p-4 text-gray-900 border border-divider rounded-md  sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
            className={`block w-full p-4  ${
              !errors.password
                ? 'border border-divider text-gray-900'
                : 'bg-red-50 border border-red-500 text-red-900'
            } rounded-md  sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none`}
            placeholder="contraseña"
            {...register('password', {
              required: 'Este campo es requerido',
              minLength: { value: 6, message: 'Mínimo 6 caracteres' },
            })}
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-primary w-full py-2 text-lg text-white uppercase rounded-md shadow-md cursor-pointer"
        >
          iniciar sesión
        </button>
      </form>
      <div className="mt-4 text-center">
        <span className="text-sm">¿No tienes cuenta? </span>
        <Link href={`/auth/register${myQuery}`} className="text-primary underline text-sm">
          crear cuenta
        </Link>
      </div>
      <div className="mt-6 w-full bg-background rounded-md p-6 text-center">
        <span className="text-sm">¿Ha olvidado su contraseña? </span>
        <Link href="#" className="text-primary underline text-sm uppercase">
          recuperar
        </Link>
      </div>
    </div>
  );
};
