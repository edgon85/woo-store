'use client';
import { updateUserData } from '@/actions';
import { Button, SpinnerIcon } from '@/components/ui';
import { useAuthStore } from '@/stores';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-responsive-modal';
import { toast } from 'react-toastify';

type FormName = {
  email: string;
  password: string;
};

type Props = {
  userId: string;
  email: string;
  authType: string;
};

export const EmailSection = ({ userId, email, authType }: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [initialValue, setInitialValue] = useState(email);
  const [loading, setLoading] = useState<boolean>(false);

  const { logout } = useAuthStore((state) => state);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormName>({ defaultValues: { email } });

  const currentEmail = watch('email', email);

  useEffect(() => {
    setInitialValue(email);
  }, [email]);

  const onHandleSubmit = async (formData: FormName) => {
    setLoading(true);
    const { data, message, ok } = await updateUserData({
      id: userId,
      email: formData.email,
      password: formData.password,
    });

    if (!ok) {
      toast.error(message || 'Ocurrió un error al actualizar.');
      setLoading(false);
      return;
    } else {
      toast.success('¡Tu usuario ha sido actualizado!');
      setLoading(false);
      logout();
    }
  };

  const closeModal = () => {
    reset();
    setModalOpen(false);
  };

  return (
    <>
      <div className="bg-white p-4 w-full ">
        <div className=" flex justify-between items-center py-2">
          <div className="flex-1">
            <p className="block text-base font-medium text-gray-700">Correo</p>
            <h2 className="text-base font-bold">{initialValue}</h2>
          </div>
          <div className="flex-1">
            {authType !== 'credentials' ? (
              <>
                <span>Asociado con {authType}</span>
              </>
            ) : (
              <button
                type="submit"
                onClick={() => setModalOpen(true)}
                className="border text-cerise-red-600 border-cerise-red-600 hover:bg-cerise-red-50 p-2 rounded-md"
              >
                Cambiar
              </button>
            )}
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onClose={closeModal} center>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <div className="w-96 p-4 flex flex-col gap-2">
            <h2 className="text-base">Actualizar Correo</h2>

            <label htmlFor="email">Ingresa tu nuevo correo</label>
            <input
              id="email"
              type="text"
              className=" flex-1 w-full p-2 border rounded-md resize-none"
              placeholder="Ingresa nuevo correo"
              {...register('email', { required: 'Este campo es requerido' })}
            />

            <label htmlFor="password">Ingresa tu contraseña actual</label>
            <input
              id="password"
              type="password"
              className=" flex-1 w-full p-2 border rounded-md resize-none"
              placeholder="Ingresa nuevo correo"
              {...register('password', { required: 'Este campo es requerido' })}
            />

            {errors.password && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.password.message}
              </p>
            )}
            {loading ? (
              <div className="flex justify-center items-center">
                <SpinnerIcon className="w-6 h-6 animate-spin" />
              </div>
            ) : (
              <Button
                type="submit"
                label="Cambiar"
                disabled={initialValue === currentEmail}
              />
            )}
          </div>
        </form>
      </Modal>
    </>
  );
};
