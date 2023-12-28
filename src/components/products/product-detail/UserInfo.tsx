import { checkImageAvailable } from '@/actions';
import { InitialsProfile } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsArrowRight, BsStarFill } from 'react-icons/bs';

type Props = {
  name: string;
  image: string;
  location: string;
  username: string;
};

export const UserInfo = async ({ name, image, location, username }: Props) => {
  const imageUrl = await checkImageAvailable(image);

  return (
    <section className="flex items-center p-2 md:p-4 bg-white md:rounded md:shadow">
      {imageUrl !== null ? (
        <Image
          src={imageUrl}
          alt="foto de perfil"
          width={64}
          height={64}
          className="w-16 h-16 rounded-full object-fill"
          priority={true}
        />
      ) : (
        <div className="w-16 h-16 flex justify-center items-center rounded-full bg-cerise-red-500 font-bold text-white">
          {InitialsProfile(name)}
        </div>
      )}

      <div className="flex-1 ml-4">
        <h2 className="text-xl font-semibold">{name}</h2>

        <div className="flex items-center mt-1">
          <BsStarFill color="gold" />
          (4.3)
        </div>
        <p className="mt-1 text-sm text-gray-500">{location || ''}</p>
      </div>

      <Link
        className="text-darkPrimary hover:text-primary "
        href={`/member/${username}`}
      >
        <BsArrowRight size={24} />
      </Link>
    </section>
  );
};
