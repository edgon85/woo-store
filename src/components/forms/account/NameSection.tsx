'use client';
import { AlertComponent, Button } from '@/components/ui';
import { updateUserData } from '@/helpers';
import { IProfile } from '@/interfaces';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Modal from 'react-responsive-modal';

type FormName = {
  fullName: string;
};

type Props = {
  userId: string;
  fullName: string;
  token: string;
};

export const NameSection = ({ userId, fullName, token }: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | ''>('');

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
    try {
      const data = await updateUserData(userId, token, {
        fullName: formData.fullName,
      });
      setInitialValue(data.fullName);
      setAlertType('success');
    } catch (error) {
      console.error('Error al actualizar nombre:', error);
      setAlertType('error');
    } finally {
      setModalOpen(false);
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
              className="border text-primary border-primary hover:bg-primary hover:text-white p-2 rounded-md "
            >
              Cambiar
            </button>
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onClose={() => setModalOpen(false)} center>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <div className="w-96 p-4 flex flex-col gap-2">
            <h2 className="text-base">Actualizar nombre</h2>
            <input
              id="sobreMi"
              type="text"
              className=" flex-1 w-full p-2 border rounded-md resize-none"
              placeholder="Nombre y apellido"
              defaultValue={fullName}
              {...register('fullName', { required: true })}
            />
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
          message="¡Tu nombre ha sido actualizado!"
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

/* 
<input
          id="sobreMi"
          type="text"
          className=" flex-1 w-full p-2 border rounded-md resize-none"
          placeholder="Nombre y apellido"
        />
*/
