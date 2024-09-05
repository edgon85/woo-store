'use client';
import { isEmail, isPassword } from '@/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SpinnerIcon } from '../ui';
import { useAuthStore } from '@/stores';
import { useAuthProviders } from '@/hooks';

type FormData = {
  fullName: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const [error, setError] = useState('');
  const {  loginCredentials } = useAuthProviders();
  const { registerUser } = useAuthStore((state) => state);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onRegisterUser = async (data: FormData) => {
    setIsLoading(true);
    setError('');

    try {
      const { hasError, message } = await registerUser(
        data.fullName,
        data.email,
        data.password
      );

      if (hasError) {
        setError(message || 'Error en el registro');
        return;
      }

      await loginCredentials(data.email, data.password);
    } catch (error) {
      setError('Ocurrió un error inesperado');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClassName = (fieldError?: string) => `
    block w-full p-4 text-gray-900 border rounded-md sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none
    ${fieldError ? 'border-red-500 bg-red-50' : 'border-divider'}
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
      <form onSubmit={handleSubmit(onRegisterUser)} noValidate>
        {['fullName', 'email', 'password'].map((field) => (
          <div key={field} className="mb-3">
            <label
              htmlFor={field}
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              {field === 'fullName'
                ? 'Nombre y apellido'
                : field === 'email'
                ? 'Correo electrónico'
                : 'Contraseña'}
            </label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              id={field}
              className={inputClassName(
                errors[field as keyof FormData]?.message
              )}
              placeholder={
                field === 'fullName'
                  ? 'Nombre y apellido'
                  : field === 'email'
                  ? 'user@correo.com'
                  : 'contraseña'
              }
              disabled={isLoading}
              {...register(field as keyof FormData, {
                required: 'Este campo es requerido',
                ...(field === 'fullName' && {
                  minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                }),
                ...(field === 'email' && { validate: isEmail }),
                ...(field === 'password' && {
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                  validate: isPassword,
                }),
              })}
            />
            {errors[field as keyof FormData] && (
              <p className="mt-2 text-sm text-red-600">
                {errors[field as keyof FormData]?.message}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="bg-primary w-full py-2 text-lg text-white uppercase rounded-md shadow-md cursor-pointer disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <SpinnerIcon className="w-6 h-6 animate-spin" />
            </span>
          ) : (
            'Registrarse'
          )}
        </button>
      </form>
    </div>
  );
};
