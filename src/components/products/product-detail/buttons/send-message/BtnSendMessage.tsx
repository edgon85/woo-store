'use client';
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';

import { ChatContext } from '@/context';
import { getChatForUser } from '@/actions';
import { ModalSendMessage } from './ModalSendMessage';

import { useAuthStore, useModalAuth } from '@/stores';

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
  
  const [open, setOpen] = useState(false);
  const { dispatch } = useContext(ChatContext);
  const router = useRouter();
  const { user, isLoggedIn } = useAuthStore((state) => state);
  const { openModal } = useModalAuth();

  const onHandleClick = async () => {
    if (!isLoggedIn) {
      openModal();
      return;
    }

    const { ok, data } = await getChatForUser(recipientId, productId);

    if (!ok) {
      setOpen(true);
    } else {
      dispatch({
        type: '[Chat] - SET_UID',
        payload: user?.id,
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

  return (
    <>
      <button
        onClick={onHandleClick}
        className="w-full border border-cerise-red-700 text-cerise-red-700 text-sm hover:bg-cerise-red-500 hover:text-white rounded flex justify-center items-center py-2"
      >
        Enviar mensaje
      </button>
      <ModalSendMessage
        open={open}
        setOpen={setOpen}
        recipientId={recipientId}
        productId={productId}
        title={title}
      />
    </>
  );
};
