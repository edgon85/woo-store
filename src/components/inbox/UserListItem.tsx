import { IUser } from '@/interfaces';
import { IChat } from '@/stores';
import Link from 'next/link';

type Props = {
  chat: IChat;
};

export const UserListItem = ({ chat }: Props) => {
  return (
    <Link
      href={`/inbox/${chat.id}?username=${chat.username}`}
      className="flex flex-row py-4 px-2 justify-center items-center border-b-2 cursor-pointer"
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
      <div className="w-full">
        <div className="text-lg font-semibold">{chat.username}</div>
        <span className="text-gray-500">Pick me at 9:00 Am</span>
      </div>
    </Link>
  );
};

/* 
TODO: si esta seleccionado el usuario, cambiar el color de fondo
border-l-4 border-blue-400
*/
