import { checkImageAvailable } from '@/actions';
import { IUser } from '@/interfaces';
import { InitialsProfile } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';

export const UserProfile = async ({ user }: { user: IUser | null }) => {
  const { profileImage } = user!;
  const imageUrl = await checkImageAvailable(profileImage);

  return (
    <div className="flex items-center p-2">
      <Link href={`/member/${user?.username}`}>
        {imageUrl !== null ? (
          <Image
            src={imageUrl}
            alt={`${user?.username || 'Usuario'} avatar`}
            className="w-10 h-10 rounded-full"
            width={40}
            height={40}
          />
        ) : (
          <span className="w-10 h-10 flex justify-center items-center rounded-full bg-cerise-red-400 font-bold text-white">
            {InitialsProfile(user?.fullName!)}
          </span>
        )}
      </Link>
      {/*    <Link href={`/member/${user?.username}`} className="ml-2 text-gray-800">
        {user?.username || 'Nombre de Usuario'}
      </Link> */}
    </div>
  );
};
