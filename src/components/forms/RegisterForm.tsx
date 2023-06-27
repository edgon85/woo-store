'use client';
import { useAuth } from '@/hooks';
import { isEmail, isPassword } from '@/utils';
import Link from 'next/link';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  fullName: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { registerUser, login } = useAuth();

  const searchParams = useSearchParams();
  const query = searchParams.get('p');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const myQuery = query !== null ? `?p=${query}` : '';

  const onRegisterUser = async ({ fullName, email, password }: FormData) => {
    const { hasError, message } = await registerUser(fullName, email, password);

    if (hasError) {
      setShowError(true);
      setErrorMessage(message || '');
      setTimeout(() => {
        setShowError(false);
      }, 5000);
      return;
    }

    login(email, password);
  };

  return (
    <div className="w-full">
      {showError && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          <span className="font-medium">Error</span> {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit(onRegisterUser)}>
        <div className="mb-3">
          <label
            htmlFor="large-input"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Nombre y apellido
          </label>
          <input
            type="text"
            id="large-input"
            className="block w-full p-4 text-gray-900 border border-divider rounded-md  sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
            placeholder="Nombre y apellido"
            {...register('fullName', {
              required: 'Este campo es requerido',
              minLength: { value: 3, message: 'Mínimo 3 caracteres' },
            })}
          />
          {errors.fullName && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="large-input"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Correo electrónico
          </label>
          <input
            type="email"
            id="large-input"
            className="block w-full p-4 text-gray-900 border border-divider rounded-md  sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
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
            className="block w-full p-4 text-gray-900 border border-divider rounded-md  sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
            placeholder="contraseña"
            {...register('password', {
              required: 'Este campo es requerido',
              minLength: { value: 6, message: 'Mínimo 6 caracteres' },
              validate: isPassword,
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
        <span className="text-sm">¿ya tienes cuenta? </span>
        <Link
          href={`/auth/login${myQuery}`}
          className="text-primary underline text-sm"
        >
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
};
