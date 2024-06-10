'use client';
import { checkImageAvailable } from '@/actions';
import { useInboxStore } from '@/stores';
import { formatDateToLocal } from '@/utils';
import { useRouter } from 'next/navigation';
import { UserIcon } from '../ui';
import { useContext, useEffect, useState } from 'react';
import { IChat, IUserChar } from '@/interfaces';
import { ChatContext } from '@/context';

type Props = {
  user: IChat;
};

export const UserListItem = ({ user }: Props) => {
  const { dispatch, chatState } = useContext(ChatContext);

  const [imageUrl, setImageUrl] = useState<string | null>(''); // Change the type from 'string || null' to 'string | null'

  useEffect(() => {
    checkImage(user.recipient.avatar);
  }, [user.recipient.avatar]);

  const checkImage = async (url: string) => {
    const imageUrl = await checkImageAvailable(url);
    setImageUrl(imageUrl);
  };

  const onHandleClick = async () => {
    console.log(user.id);
    dispatch({
      type: '[Chat] - activar-chat',
      payload: { senderId: user.user.id, recipientId: user.recipient.id },
    });

    //TODO:Cargar los mensajes del chat
  };

  return (
    <button
      onClick={onHandleClick}
      className="flex flex-row py-4 px-2 border-b-2 cursor-pointer"
    >
      <div className="w-1/4">
        {imageUrl !== null ? (
          <picture>
            <img
              src={`${imageUrl}`}
              alt={`foto de perfil de ${user.recipient.username}`}
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
      <div className="flex  flex-col justify-start items-start">
        <div className="text-lg font-semibold">{user.recipient.username}</div>
        <span className="text-gray-500">
          {formatDateToLocal(user.chatInboxDate)}
        </span>
      </div>
    </button>
  );
};

/* 
TODO: si esta seleccionado el usuario, cambiar el color de fondo
border-l-4 border-blue-400
*/
