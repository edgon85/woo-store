import { AlertComponent, Button } from '@/components/ui';
import { updateUserData } from '@/helpers';
import { useAuth } from '@/hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-responsive-modal';

type FormName = {
  email: string;
  password: string;
};

type Props = {
  userId: string;
  token: string;
  email: string;
  authType: string;
};

export const EmailSection = ({ userId, token, email, authType }: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | ''>('');
  const [initialValue, setInitialValue] = useState(email);

  const { logout } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormName>({ defaultValues: { email } });

  const currentFullName = watch('email', email);

  useEffect(() => {
    setInitialValue(email);
  }, [email]);

  const onHandleSubmit = async (formData: FormName) => {
    try {
      const { data, message } = await updateUserData(userId, token, {
        email: formData.email,
        password: formData.password,
      });

      if (message !== 'ok') {
        setAlertType('error');
        console.log(message);
        setError('password', { type: 'manual', message: message });
        return;
      }

      setInitialValue(data.email);
      setAlertType('success');
      setModalOpen(false);
      logout();
    } catch (error) {
      console.error('Error al actualizar nombre:', error);
      setAlertType('error');
      setModalOpen(false);
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
                className="border text-primary border-primary hover:bg-primary hover:text-white p-2 rounded-md "
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
            <Button
              type="submit"
              label="Cambiar"
              disabled={initialValue === currentFullName}
            />
          </div>
        </form>
      </Modal>
      {alertType === 'success' && (
        <AlertComponent
          type="success"
          message="¡Tu usuario ha sido actualizado!"
          onDismiss={() => setAlertType('')}
        />
      )}
      {alertType === 'error' && (
        <AlertComponent
          type="error"
          message="Ocurrió un error al actualizar."
          onDismiss={() => setAlertType('')}
        />
      )}
    </>
  );
};
