'use client';

import { AuthContext, ChatContext } from '@/context';
import { Divider } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-responsive-modal';
import {
  createNewMessageForChat,
  getChatForUser,
  getInboxChats,
} from '@/actions';
import Cookies from 'js-cookie';

type FormInputData = {
  message: string;
};

type Props = {
  recipientId: string;
  recipientUsername: string;
  productId: string;
  slug: string;
  title: string;
};

export const BtnSendMessage = ({
  recipientId,
  recipientUsername,
  productId,
  slug,
  title,
}: Props) => {
  const { isLoggedIn } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

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

  const onCloseModal = () => {
    reset();
    setOpen(false);
  };

  const onHandleClick = async () => {
    if (!isLoggedIn) {
      router.push(`/auth/login?p=/product/${slug}`);
      return;
    }

    const { ok, data } = await getChatForUser(recipientId, productId);

    if (!ok) {
      // setValue('message', 'Hola, estoy interesado en tu producto');
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
    const { ok: okNewMessage } = await createNewMessageForChat(
      data.message.trim(),
      recipientId,
      productId
    );

    if (okNewMessage) {
      const { ok, data: usuarios } = await getInboxChats();

      if (ok) {
        dispatch({
          type: '[Chat] - cargar-usuarios',
          payload: usuarios,
        });

        reset();
        setOpen(false);
        router.push('/inbox');
      } else {
        console.log('Error al cargar los mensajes');
      }
    } else {
      console.log('Error al enviar el mensaje');
    }
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
            <p>
              Hola! Si tienes cualquier duda acerca de mi artículo{' '}
              <span className="font-bold">{title}</span> puedes escribirme aquí
            </p>
            <Divider />
            <div className="mb-4">
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
                className="w-full ml-2 px-4 py-2 bg-cerise-red-600 hover:bg-cerise-red-500 text-white rounded-lg"
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