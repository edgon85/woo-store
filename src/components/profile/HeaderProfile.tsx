'use client';
import { useAuth } from '@/hooks';
import { Button, EditIcon, ShareIcon, UserIcon } from '../ui';
import Link from 'next/link';

interface LocalProfile {
  id: string;
  username: string;
  fullName: string;
  biography: string;
  profileImage: string;
  location: string;
}

type Props = {
  userData: LocalProfile;
};

export const HeaderProfile = ({ userData }: Props) => {
  const { user } = useAuth();

  return (
    <header className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center">
      <div className="profile flex flex-row  gap-4 pt-2 pb-2">
        <div className="w-12 h-12 flex justify-center items-center border rounded-full overflow-hidden">
          {userData?.profileImage !== null ? (
            <picture>
              <img
                src={userData?.profileImage}
                alt=""
                className="object-cover w-full h-full rounded"
              />
            </picture>
          ) : (
            <div className=" text-red-700">
              <UserIcon />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-lg">{userData?.username}</h2>
          <p>★★★☆☆</p>
          {user?.username === userData.username ? (
            <Link
              className='p-2 text-center rounded text-primary border border-primary text-sm'
              href={`/settings/profile`}>Editar</Link>
          ) : null}
        </div>
      </div>
      <div className="min-w-[200px]">
        <Button
          type="button"
          label="Compartir"
          outlined={true}
          icon={ShareIcon}
        />
      </div>
    </header>
  );
};
