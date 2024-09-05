'use client';
import { revalidateData, updateUserData } from '@/actions';
import { Button, SpinnerIcon } from '@/components/ui';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-responsive-modal';
import { toast } from 'react-toastify';

type FormName = {
  username: string;
};

type Props = {
  userId: string;
  username: string;
};

export const UsernameSection = ({ userId, username }: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [initialValue, setInitialValue] = useState(username);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormName>({ defaultValues: { username: username } });

  const currentUsername = watch('username', username);

  useEffect(() => {
    setInitialValue(username);
  }, [username]);

  const onHandleSubmit = async (formData: FormName) => {
    setLoading(true);
    const { data, message, ok } = await updateUserData({
      id: userId,
      username: formData.username,
    });

    if (!ok) {
      toast.error(message || 'Ocurrió un error al actualizar.');
      setLoading(false);
      return;
    } else {
      toast.success('¡Tu usuario ha sido actualizado!');
      setLoading(false);
      setModalOpen(false);
      revalidateData(
        `/settings/account/${userId}`,
        `/settings/account/${userId}`
      );
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
              className="border text-cerise-red-600 border-cerise-red-600 hover:bg-cerise-red-50 p-2 rounded-md"
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
            {loading ? (
              <div className="flex justify-center items-center">
                <SpinnerIcon className="w-6 h-6 animate-spin" />
              </div>
            ) : (
              <Button
                type="submit"
                label="Cambiar"
                disabled={initialValue === currentUsername}
              />
            )}
          </div>
        </form>
      </Modal>
    </>
  );
};
