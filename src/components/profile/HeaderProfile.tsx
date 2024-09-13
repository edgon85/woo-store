'use server';
import { UserIcon } from '../ui';
import Link from 'next/link';
import { checkImageAvailable, getRatingByUsername } from '@/actions';
import { RatingComponent } from './RatingComponent';
import { getAuthInfo } from '@/libs';
import { BtnShareProfile } from './BtnShareProfile';
import Image from 'next/image';
import { DetailProfile } from './DetailProfile';

interface LocalProfile {
  id: string;
  username: string;
  fullName: string;
  biography: string;
  profileImage: string;
  location: string;
}

type Props = {
  username: string;
  profile: LocalProfile;
};

export async function HeaderProfile({ username, profile }: Props) {
  const ratingUser = await getRatingByUsername(username);
  const userInfo = await getAuthInfo();
  const { id: currentUserId } = userInfo!;
  const imageUrl = await checkImageAvailable(profile.profileImage);

  const { message: ratingMessage, data: ratingData } = ratingUser;

  return (
    <div className=" bg-white overflow-hidden">
      <div className="flex p-4">
        {imageUrl ? (
          <Image
            className="w-16 h-16 rounded-full"
            src={imageUrl!}
            alt="Profile"
            width={64}
            height={64}
          />
        ) : (
          <span className="w-16 h-16 rounded-full flex justify-center items-center bg-cerise-red-400 text-white">
            <UserIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          </span>
        )}

        <div className="flex flex-col gap-1 ml-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {profile.username}
          </h2>
          <div className="flex items-center">
            <RatingComponent data={ratingData} message={ratingMessage} />
          </div>
          <p className="text-sm text-gray-600">
            {profile.location ? `${profile.location}` : ''}
          </p>
          {/* <p className="text-sm text-gray-600">
            Última conexión hace 23 minutos
          </p> */}
          <div>
            {currentUserId === profile.id && (
              <Link
                href={`/settings/profile/${profile.id}`}
                className="px-2 py-1 rounded border text-cerise-red-600 border-cerise-red-600 hover:bg-cerise-red-50"
              >
                Editar
              </Link>
            )}
          </div>
        </div>
        <div className="ml-auto">
          <BtnShareProfile />
        </div>
      </div>
      <div className="px-4 py-2">
        {/* <p className="whitespace-pre-wrap">{profile.biography}</p> */}
        <DetailProfile biography={profile.biography} />
      </div>
      {/*  <div className="flex justify-between px-4 py-2">
        <button className="bg-cerise-red-600 text-white font-semibold py-2 px-4 rounded-lg">
          Mensaje
        </button>
        <button className="bg-cerise-red-600 text-white font-semibold py-2 px-4 rounded-lg">
          Seguir
        </button>
      </div> */}
    </div>
  );
}
/*  <header className="flex gap-2 md:gap-4 py-4">
      <div className="w-12 h-12 md:w-16 md:h-16 flex justify-center items-center rounded-full overflow-hidden relative border border-gray-200 hover:border-cerise-red-600">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`foto de perfil de ${profile.fullName}`}
            className="object-cover w-full h-full"
            width={48}
            height={48}
          />
        ) : (
          <span className="w-full h-full flex justify-center items-center bg-cerise-red-400 text-white">
            <UserIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          </span>
        )}
      </div>
      <div className="w-full flex flex-col">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1 items-start">
            <h2 className="font-bold text-lg">{profile.username}</h2>

            <RatingComponent data={ratingData} message={ratingMessage} />
            {currentUserId === profile.id && (
              <Link
                href={`/settings/profile/${profile.id}`}
                className="px-2 py-1 rounded border text-cerise-red-600 border-cerise-red-600 hover:bg-cerise-red-50"
              >
                Editar
              </Link>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:items-start">
            <BtnShareProfile />
          </div>
        </div>
        <div className="pt-2 md:pt-4">
          <p className="whitespace-pre-wrap">{profile.biography}</p>
        </div>
      </div>
    </header> */
