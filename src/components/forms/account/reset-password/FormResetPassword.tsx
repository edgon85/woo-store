import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { changePassword } from '@/actions';
import { SpinnerIcon } from '@/components/ui';
import { useAuthStore } from '@/stores';
import { isPassword } from '@/utils';

type FormPasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type Props = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export const FormResetPassword = ({ setOpenModal }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { logout } = useAuthStore();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<FormPasswordData>();

  const newPassword = watch('newPassword');

  const onHandleSubmit = async (formData: FormPasswordData) => {
    setIsLoading(true);
    const currentPassword = formData.currentPassword.toString().trim();
    const newPassword = formData.newPassword.toString().trim();

    try {
      const resp = await changePassword(currentPassword, newPassword);

      if (!resp.ok) {
        toast.error(resp.message);
      } else {
        logout();
        toast.success(resp.data);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log('Ocurrió un error', error.message);
    } finally {
      setIsLoading(false);
      setOpenModal(false);
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
    <form onSubmit={handleSubmit(onHandleSubmit)}>
      {[
        {
          name: 'currentPassword',
          label: 'Contraseña actual',
          type: 'password',
          placeholder: 'contraseña actual',
        },
        {
          name: 'newPassword',
          label: 'Contraseña nueva',
          type: 'password',
          placeholder: 'contraseña nueva',
        },
        {
          name: 'confirmPassword',
          label: 'Confirmar contraseña nueva',
          type: 'password',
          placeholder: 'Confirmar contraseña nueva',
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
              errors[field.name as keyof FormPasswordData]?.message
            )}
            placeholder={field.placeholder}
            disabled={isLoading}
            {...register(field.name as keyof FormPasswordData, {
              required: 'Este campo es requerido',
              ...(field.name === 'currentPassword' && {
                minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                validate: isPassword,
              }),
              ...(field.name === 'newPassword' && {
                minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                validate: isPassword,
              }),
              ...(field.name === 'confirmPassword' && {
                validate: (value) =>
                  value === newPassword || 'Las contraseñas no coinciden',
              }),
            })}
          />

          {errors[field.name as keyof FormPasswordData] && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors[field.name as keyof FormPasswordData]?.message}
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
            <SpinnerIcon className="animate-spin" />
          </span>
        ) : (
          'Cambiar contraseña'
        )}
      </button>
      <span className="text-xs text-gray-400 text-center mt-2">
        Al cambiar contraseña tendrá que iniciar sesión nuevamente
      </span>
    </form>
  );
};
