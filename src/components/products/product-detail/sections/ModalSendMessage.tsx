'use client';

import { ChatContext, SocketContext } from '@/context';
import { Divider } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-responsive-modal';

type FormInputData = {
  message: string;
};

type Props = {
  recipientId: string;
  recipientUsername: string;
};

export const ModalSendMessage = ({ recipientId, recipientUsername }: Props) => {
  const [open, setOpen] = useState(false);
  const { socket } = useContext(SocketContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormInputData>();

  const onCloseModal = () => setOpen(false);

  const onHandleClick = async () => {
    // const { data } = await getChatForUser(recipientId);

    setValue('message', 'Hola, estoy interesado en tu producto');
    setOpen(true);
    /* if (data) {
      // TODO: mandar al chat y activar chat
       console.log(data);
      addChat(data);
      selectChat(data.id);
      router.push(
        `/inbox/${data.id || ''}?username=${recipientUsername || ''}`
      ); 
    } else {
      setValue('message', 'Hola, estoy interesado en tu producto');
      setOpen(true);
    } */
  };

  const onSubmit = (data: FormInputData) => {



    socket?.emit('message-from-client', {
      message: data.message.trim(),
      to: recipientId,
    });
    reset();
    setOpen(false);
    // }
  };

  return (
    <>
      <button
        onClick={onHandleClick}
        className="w-full border border-cerise-red-700 text-cerise-red-700 text-sm hover:bg-cerise-red-500 hover:text-white rounded flex justify-center items-center py-2"
      >
        Enviar mensaje
      </button>
      <Modal open={open} onClose={onCloseModal} center>
        <section className="md:w-96">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-center text-lg font-semibold">
              Enviar mensaje
            </h2>
            <Divider />
            <div className="mb-6">
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                placeholder="Escribe un mensaje..."
                {...register('message', {
                  required: 'Este campo es requerido',
                })}
              />
              {errors.message && (
                <span className="text-sm text-red-800">
                  {errors.message.message}
                </span>
              )}
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-cerise-red-600 text-white rounded-lg"
              >
                Enviar
              </button>
            </div>
          </form>
        </section>
      </Modal>
    </>
  );
};
