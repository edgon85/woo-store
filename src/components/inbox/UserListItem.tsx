'use client';

import { checkImageAvailable, getMessagesForUser } from '@/actions';
import { UserIcon } from '../ui';
import { useContext, useEffect, useState } from 'react';
import { IChat } from '@/interfaces';
import { ChatContext } from '@/context';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

type Props = {
  chat: IChat;
};

export const UserListItem = ({ chat }: Props) => {
  const { dispatch, chatState } = useContext(ChatContext);
  const router = useRouter();
  const currentId = Cookies.get('userId');

  const [imageUrl, setImageUrl] = useState<string | null>('');

  useEffect(() => {
    checkImage(chat.user.avatar);
  }, [chat.user.avatar]);

  const checkImage = async (url: string) => {
    const imageUrl = await checkImageAvailable(url);
    setImageUrl(imageUrl);
  };

  const onHandleClick = async () => {
    // console.log({ chat });

    dispatch({
      type: '[Chat] - SET_UID',
      payload: currentId,
    });
    dispatch({
      type: '[Chat] - activar-chat',
      payload: chat.id,
    });
    dispatch({
      type: '[Chat] - SET_PROD_ID',
      payload: chat.product,
    });

    //Cargar los mensajes del chat
    const data = await getMessagesForUser(chat.id);

    // console.log(data);
    if (data.ok) {
      dispatch({
        type: '[Chat] - cargar-mensajes',
        payload: data.data,
      });

      router.push(`/inbox?u=${chat.user.id}&n=${chat.user.username}`);
    }
  };

  return (
    <button
      onClick={onHandleClick}
      className={`flex flex-row gap-4 py-4 px-2 border-b-2 cursor-pointer ${
        chat.id === chatState.activeChat ? 'border-l-4 border-blue-400' : ''
      }`}
    >
      <div className="">
        {imageUrl !== null ? (
          <picture>
            <img
              src={`${imageUrl}`}
              alt={`foto de perfil de ${chat.user.username}`}
              className="object-cover h-12 w-12 rounded-full"
              loading="lazy"
            />
          </picture>
        ) : (
          <span className="w-12 h-12 flex justify-center items-center rounded-full bg-cerise-red-400 font-bold text-white">
            <UserIcon />
          </span>
        )}
      </div>
      <div className="flex  flex-col justify-start items-start ">
        <div className="text-lg font-semibold">{chat.user.username}</div>
        <span className="text-gray-500">
          {/* {formatDateToLocal(chat.created_at)} */}
          {chat.lastMessage}
        </span>
      </div>
    </button>
  );
};

/* 
TODO: si esta seleccionado el usuario, cambiar el color de fondo
border-l-4 border-blue-400
*/
