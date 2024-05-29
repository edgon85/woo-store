'use client';
import { IChat, useInboxStore } from '@/stores';
import { formatDateToLocal } from '@/utils';
import { useRouter } from 'next/navigation';

type Props = {
  chat: IChat;
};

export const UserListItem = ({ chat }: Props) => {
  const { selectChat } = useInboxStore();
  const router = useRouter();
  const onHandleClick = () => {
    selectChat(chat.id);
    router.push(`/inbox/${chat.id}?username=${chat.username}`);
  };

  return (
    <button
      // href={`/inbox/${chat.id}?username=${chat.username}`}
      onClick={onHandleClick}
      className="flex flex-row py-4 px-2 border-b-2 cursor-pointer"
    >
      <div className="w-1/4">
        <picture>
          <img
            src={chat.profilePicture}
            className="object-cover h-12 w-12 rounded-full"
            alt=""
          />
        </picture>
      </div>
      <div className="flex  flex-col justify-start items-start">
        <div className="text-lg font-semibold">{chat.username}</div>
        <span className="text-gray-500">
          {formatDateToLocal(chat.timestamp)}
        </span>
      </div>
    </button>
  );
};

/* 
TODO: si esta seleccionado el usuario, cambiar el color de fondo
border-l-4 border-blue-400
*/
