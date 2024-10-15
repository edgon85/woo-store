'use client';
import { revalidateData, updateUserData } from '@/actions';
import { Button, SpinnerIcon } from '@/components/ui';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Modal from 'react-responsive-modal';
import { toast } from 'react-toastify';

type FormName = {
  fullName: string;
};

type Props = {
  userId: string;
  fullName: string;
};

export const NameSection = ({ userId, fullName }: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [initialValue, setInitialValue] = useState(fullName);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormName>({ defaultValues: { fullName: fullName } });

  const currentFullName = watch('fullName', fullName);

  useEffect(() => {
    setInitialValue(fullName);
  }, [fullName]);

  const onHandleSubmit = async (formData: FormName) => {
    setLoading(true);
    const { data, message, ok } = await updateUserData({
      id: userId,
      fullName: formData.fullName,
    });

    if (!ok) {
      toast.error(message || 'Ocurrió un error al actualizar.');
      setLoading(false);
      return;
    } else {
      toast.success('¡Tu nombre ha sido actualizado!');
      setLoading(false);
      setModalOpen(false);
      revalidateData(
        `/settings/account/${userId}`,
        `/settings/account/${userId}`
      );
    }
  };

  return (
    <>
      <div className="bg-white p-4 w-full ">
        <div className=" flex justify-between items-center py-2">
          <div className="flex-1">
            <p className="block text-base font-medium text-gray-700">Nombre</p>
            <h2 className="text-base font-bold">{initialValue}</h2>
          </div>
          <div className="flex-1">
            <button
              type="submit"
              onClick={() => setModalOpen(true)}
              className="border text-cerise-red-600 border-cerise-red-600 hover:bg-cerise-red-50 p-2 rounded-md "
            >
              Cambiar
            </button>
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onClose={() => setModalOpen(false)} center>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <div className="w-72 md:w-96 py-4 flex flex-col gap-2">
            <h2 className="text-base">Actualizar nombre</h2>
            <input
              id="sobreMi"
              type="text"
              className=" flex-1 w-full p-2 border rounded-md resize-none"
              placeholder="Nombre y apellido"
              defaultValue={fullName}
              {...register('fullName', { required: true })}
            />
            {loading ? (
              <div className="flex justify-center items-center">
                <SpinnerIcon className="w-6 h-6 animate-spin" />
              </div>
            ) : (
              <Button
                type="submit"
                label="Cambiar"
                disabled={initialValue === currentFullName}
              />
            )}
          </div>
        </form>
      </Modal>
    </>
  );
};
