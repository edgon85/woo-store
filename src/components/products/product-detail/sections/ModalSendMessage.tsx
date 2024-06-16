'use client';

import { ChatContext, SocketContext } from '@/context';
import { Divider } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-responsive-modal';
import { getChatForUser, getInboxChats, getMessagesForUser } from '@/actions';
import Cookies from 'js-cookie';

type FormInputData = {
  message: string;
};

type Props = {
  recipientId: string;
  recipientUsername: string;
  productId: string;
};

export const ModalSendMessage = ({
  recipientId,
  recipientUsername,
  productId,
}: Props) => {
  const [open, setOpen] = useState(false);
  const { socket } = useContext(SocketContext);

  const { dispatch } = useContext(ChatContext);
  const router = useRouter();
  const currentId = Cookies.get('userId');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormInputData>();

  const onCloseModal = () => setOpen(false);

  const onHandleClick = async () => {
    /*     setValue('message', 'Hola, estoy interesado en tu producto');
    setOpen(true); */

    const { ok, data } = await getChatForUser(recipientId, productId);

    console.log(ok);
    if (!ok) {
      setValue('message', 'Hola, estoy interesado en tu producto');
      setOpen(true);
    } else {
      dispatch({
        type: '[Chat] - SET_UID',
        payload: currentId,
      });
      dispatch({
        type: '[Chat] - activar-chat',
        payload: data.id,
      });

      //Cargar los mensajes del chat
      dispatch({
        type: '[Chat] - cargar-mensajes',
        payload: data.messages,
      });

      router.push(`/inbox?u=${recipientId}&n=${recipientUsername}`);
      setOpen(false);
    }
  };

  const onSubmit = async (data: FormInputData) => {
    socket?.emit('message-from-client', {
      message: data.message.trim(),
      productId: productId,
      to: recipientId,
    });

    //Cargar los mensajes del chat
    const { ok, data: dataList } = await getInboxChats();

    // console.log({ ok, dataList });
    // console.log(data);
    if (ok) {
      dispatch({
        type: '[Chat] - cargar-usuarios',
        payload: dataList,
      });
    }

    reset();
    // setNewMessage(true);
    setOpen(false);
    router.push('/inbox');
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
