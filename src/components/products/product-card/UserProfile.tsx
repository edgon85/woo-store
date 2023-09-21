import { IUser } from '@/interfaces';
import Link from 'next/link';

export const UserProfile = ({ user }: { user: IUser | null }) => {
  return (
    <div className="flex items-center p-2">
      <Link href={`/member/${user?.id}`}>
        <picture>
          <img
            src={'https://via.placeholder.com/150'}
            alt={`${user?.fullName || 'Usuario'} avatar`}
            className="w-10 h-10 rounded-full"
          />
        </picture>
      </Link>
      <Link href={`/member/${user?.id}`} className="ml-2 text-gray-800">
        {user?.fullName || 'Nombre de Usuario'}
      </Link>
    </div>
  );
};
