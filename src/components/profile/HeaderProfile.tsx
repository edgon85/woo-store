'use server';
import { EmptyStar, FillStar, UserIcon } from '../ui';
import Link from 'next/link';
import { fetchPublicProfile } from '@/lib';
import { cookies } from 'next/headers';
import { checkImageAvailable, getRatingByUsername } from '@/actions';
import { RatingComponent } from './RatingComponent';

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
};

export async function HeaderProfile({ username }: Props) {
  const userData = (await fetchPublicProfile(username)) as LocalProfile;
  const ratingUser = await getRatingByUsername(username);
  const currentUserId = cookies().get('userId')?.value;
  const imageUrl = await checkImageAvailable(userData?.profileImage);

  /* TODO: obtener el rating */
  const { ok, message, data } = ratingUser;

  return (
    <header className="flex gap-2 md:gap-4 py-4">
      <div className="w-12 h-12 md:w-24 md:h-24 flex justify-center items-center rounded-full overflow-hidden">
        {imageUrl !== null ? (
          <picture>
            <img
              src={imageUrl}
              alt={`foto de perfil de ${userData.fullName}`}
              className="object-cover w-24 h-24 rounded"
              loading="lazy"
            />
          </picture>
        ) : (
          <span className="w-16 h-16 flex justify-center items-center rounded-full bg-cerise-red-400 font-bold text-white">
            <UserIcon />
          </span>
        )}
      </div>
      <div className="w-full flex flex-col">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1 items-start">
            <h2 className="font-bold text-lg">{userData.username}</h2>

            <RatingComponent data={data} message={message} />

            {/* {ok ? <p>★★★☆☆</p> : <p>{message}</p>} */}
            {currentUserId === userData.id && (
              <Link
                href="/settings/profile"
                className="px-2 py-1 rounded border text-cerise-red-600 border-cerise-red-600 hover:bg-cerise-red-50"
              >
                Editar
              </Link>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:items-start">
            <button className="px-4 py-2 md:min-w-[100px] rounded border text-cerise-red-600 border-cerise-red-600 hover:bg-cerise-red-50 font-bold ">
              Seguir
            </button>
            <button className="px-4 py-2 md:min-w-[100px] font-bold rounded bg-cerise-red-600 text-white hover:bg-cerise-red-500">
              Compartir
            </button>
          </div>
        </div>
        <div className="pt-2 md:pt-4">
          <p className="whitespace-pre-wrap">{userData.biography}</p>
        </div>
      </div>
    </header>
  );
}
