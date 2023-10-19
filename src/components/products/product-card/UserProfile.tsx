import { IUser } from '@/interfaces';
import { InitialsProfile } from '@/utils';
import Link from 'next/link';

export const UserProfile = ({ user }: { user: IUser | null }) => {
  return (
    <div className="flex items-center p-2">
      <Link href={`/member/${user?.username}`}>
        {user?.profileImage !== null ? (
          <picture>
            <img
              src={user?.profileImage}
              alt={`${user?.username || 'Usuario'} avatar`}
              className="w-10 h-10 rounded-full"
            />
          </picture>
        ) : (
          <span className="w-10 h-10 flex justify-center items-center rounded-full bg-lightPrimary font-bold">
            {InitialsProfile(user?.fullName)}
          </span>
        )}
      </Link>
      <Link href={`/member/${user?.username}`} className="ml-2 text-gray-800">
        {user?.username || 'Nombre de Usuario'}
      </Link>
    </div>
  );
};
