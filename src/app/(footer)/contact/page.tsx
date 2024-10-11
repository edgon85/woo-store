'use client';
import { createMessageContact } from '@/actions';
import { SpinnerIcon } from '@/components';
import { useAuthStore } from '@/stores';
import Link from 'next/link';
import { useState, use } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type FormUserData = {
  username: string;
  email: string;
  asunto: string;
  mensaje: string;
  aceptoPrivacidad: boolean;
  autorizoComunicaciones: boolean;
};

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormUserData>({
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      asunto: '',
      mensaje: '',
      aceptoPrivacidad: false,
      autorizoComunicaciones: false,
    },
  });

  const onSubmit = async (data: FormUserData) => {
    setIsLoading(true);

    const dataToSend = {
      username: user?.username || null,
      email: data.email,
      subject: data.asunto,
      message: data.mensaje,
      acceptPrivacy: data.aceptoPrivacidad,
      authorizeCommunications: data.autorizoComunicaciones,
    };

    console.log(dataToSend);
    try {
      const { ok, message } = await createMessageContact(dataToSend);

      if (!ok) {
        toast.error('ocurrió un error al enviar el mensaje');
      } else {
        toast.success('Mensaje enviado correctamente');
        reset();
      }
    } catch (error) {
      toast.error('Error al enviar mensaje');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Contacto</h2>
      <p className="text-center text-gray-600 mb-6">
        Déjanos tu mensaje sobre tus dudas o sugerencias
        <br />
        ¡Te responderemos lo antes posible!
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Este campo es requerido',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Email inválido',
              },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="asunto"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Asunto
          </label>
          <input
            type="text"
            id="asunto"
            {...register('asunto', { required: 'Este campo es requerido' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.asunto && (
            <p className="mt-1 text-xs text-red-500">{errors.asunto.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="mensaje"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mensaje
          </label>
          <textarea
            id="mensaje"
            {...register('mensaje', { required: 'Este campo es requerido' })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          {errors.mensaje && (
            <p className="mt-1 text-xs text-red-500">
              {errors.mensaje.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register('aceptoPrivacidad', {
                required: 'Debes aceptar el Aviso de Privacidad',
              })}
              className="mr-2"
            />
            <span className="text-sm">
              Acepto el{' '}
              <Link
                href="/politicas-de-privacidad"
                className="text-cerise-red-400"
              >
                Aviso de Privacidad
              </Link>
            </span>
          </label>
          {errors.aceptoPrivacidad && (
            <p className="mt-1 text-xs text-red-500">
              {errors.aceptoPrivacidad.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register('autorizoComunicaciones')}
              className="mr-2"
            />
            <span className="text-sm">
              Autorizo el envío de comunicaciones comerciales
            </span>
          </label>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-cerise-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <SpinnerIcon className="animate-spin h-5 w-5 text-white" />
            </div>
          ) : (
            'Enviar'
          )}
        </button>
      </form>
    </div>
  );
}
