import { AlertComponent, Button } from '@/components/ui';
import { updateUserData } from '@/helpers';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-responsive-modal';

type FormName = {
  username: string;
};

type Props = {
  userId: string;
  token: string;
  username: string;
};

export const UsernameSection = ({ userId, token, username }: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | ''>('');

  const [initialValue, setInitialValue] = useState(username);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormName>({ defaultValues: { username: username } });

  const currentFullName = watch('username', username);

  useEffect(() => {
    setInitialValue(username);
  }, [username]);

  const onHandleSubmit = async (formData: FormName) => {
    try {
      const { data, message } = await updateUserData(userId, token, {
        username: formData.username,
      });

      if (message !== 'ok') {
        setAlertType('error');
        setError('username', { type: 'manual', message: message });
        return;
      }
      console.log(data);
      setInitialValue(data.username);
      setAlertType('success');
      setModalOpen(false);
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
            <p className="block text-base font-medium text-gray-700">Usuario</p>
            <h2 className="text-base font-bold">{initialValue}</h2>
          </div>
          <div className="flex-1">
            <button
              type="submit"
              onClick={() => setModalOpen(true)}
              className="border text-primary border-primary hover:bg-primary hover:text-white p-2 rounded-md "
            >
              Cambiar
            </button>
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onClose={closeModal} center>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <div className="w-96 p-4 flex flex-col gap-2">
            <h2 className="text-base">Actualizar nombre</h2>
            <input
              id="sobreMi"
              type="text"
              className=" flex-1 w-full p-2 border rounded-md resize-none"
              placeholder="Nombre y apellido"
              defaultValue={username}
              {...register('username', { required: true })}
            />
            {errors.username && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.username.message}
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
