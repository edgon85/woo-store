import { IUser } from '@/interfaces';
import Link from 'next/link';

type Props = {
  username: string;
  profilePicture: string;
};

export const UserListItem = ({ username, profilePicture }: Props) => {
  return (
    <Link
      href={`/inbox/12345467`}
      className="flex flex-row py-4 px-2 justify-center items-center border-b-2 cursor-pointer"
    >
      <div className="w-1/4">
        <picture>
          <img
            src={profilePicture}
            className="object-cover h-12 w-12 rounded-full"
            alt=""
          />
        </picture>
      </div>
      <div className="w-full">
        <div className="text-lg font-semibold">{username}</div>
        <span className="text-gray-500">Pick me at 9:00 Am</span>
      </div>
    </Link>
  );
};

/* 
TODO: si esta seleccionado el usuario, cambiar el color de fondo
border-l-4 border-blue-400
*/
