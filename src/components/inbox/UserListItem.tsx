'use client';
import { checkImageAvailable } from '@/actions';
import { IChat, useInboxStore } from '@/stores';
import { formatDateToLocal } from '@/utils';
import { useRouter } from 'next/navigation';
import { UserIcon } from '../ui';
import { useEffect, useState } from 'react';

type Props = {
  chat: IChat;
};

export const UserListItem = ({ chat }: Props) => {
  const router = useRouter();
  const selectChat = useInboxStore((state) => state.selectChat);
  const [imageUrl, setImageUrl] = useState<string | null>(''); // Change the type from 'string || null' to 'string | null'

  useEffect(() => {
    checkImage(chat.recipient.avatar);
  }, [chat.recipient.avatar]);

  const checkImage = async (url: string) => {
    const imageUrl = await checkImageAvailable(url);
    setImageUrl(imageUrl);
  };

  const onHandleClick = () => {
    selectChat(chat.id);
    router.push(`/inbox/${chat.id}?username=${chat.recipient.username}`);
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
              alt={`foto de perfil de ${chat.recipient.username}`}
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
        <div className="text-lg font-semibold">{chat.recipient.username}</div>
        <span className="text-gray-500">
          {formatDateToLocal(chat.chatInboxDate)}
        </span>
      </div>
    </button>
  );
};

/* 
TODO: si esta seleccionado el usuario, cambiar el color de fondo
border-l-4 border-blue-400
*/
