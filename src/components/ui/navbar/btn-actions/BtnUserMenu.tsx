'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { checkImageAvailable } from '@/actions';
import { useAuthStore } from '@/stores';
import { UserIcon } from '../../icons';

export const BtnUserMenu = () => {
  const { logout, user } = useAuthStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [userImage, setUserImage] = useState<string | null>(null);

  useEffect(() => {
    const handler = (evt: any) => {
      if (isCollapsed && ref.current && !ref.current.contains(evt.target)) {
        setIsCollapsed(false);
      }
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [isCollapsed]);

  const checkImage = useCallback(async () => {
    const imageUrl = await checkImageAvailable(user?.profileImage!);
    if (imageUrl === null) {
      return;
    }

    setUserImage(imageUrl!);
  }, [user?.profileImage]);

  useEffect(() => {
    checkImage();
  }, [checkImage]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsCollapsed((prev) => !prev)}
        className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="dropdown"
      >
        <span className="sr-only">Open user menu</span>
        {userImage !== null ? (
          <Image
            src={`${userImage}`}
            alt={`foto de perfil de ${user?.fullName}`}
            className="object-cover w-8 h-8 rounded-full"
            width={32}
            height={32}
          />
        ) : (
          <span className="w-8 h-8 flex justify-center items-center rounded-full bg-white font-bold">
            <UserIcon />
          </span>
        )}
      </button>
      {/* <!-- Dropdown menu --> */}
      <div
        className={`${
          isCollapsed ? 'block' : 'hidden'
        } absolute right-0 mt-2 z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow`}
        id="dropdown"
      >
        <div className="py-3 px-4">
          <span className="block text-sm font-semibold text-gray-900 ">
            {user?.fullName}
          </span>
          <span className="block text-sm text-gray-500 truncate ">
            {user?.email}
          </span>
        </div>
        <ul className="py-1 text-gray-500 " aria-labelledby="dropdown">
          <li>
            <Link
              onClick={() => setIsCollapsed(false)}
              href={`/settings/profile/${user?.id}`}
              className="block py-2 px-4 text-sm hover:bg-gray-100  "
            >
              Mi perfil
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setIsCollapsed(false)}
              href={`/settings/account/${user?.id}`}
              className="block py-2 px-4 text-sm hover:bg-gray-100  "
            >
              Configuración
            </Link>
          </li>
        </ul>
        <ul className="py-1 text-gray-500 " aria-labelledby="dropdown">
          <li>
            <Link
              onClick={() => setIsCollapsed(false)}
              href={`/member/${user?.username}`}
              className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 "
            >
              <svg
                className="mr-2 w-4 h-4 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                {' '}
                <path d="m1.56 6.245 8 3.924a1 1 0 0 0 .88 0l8-3.924a1 1 0 0 0 0-1.8l-8-3.925a1 1 0 0 0-.88 0l-8 3.925a1 1 0 0 0 0 1.8Z" />{' '}
                <path d="M18 8.376a1 1 0 0 0-1 1v.163l-7 3.434-7-3.434v-.163a1 1 0 0 0-2 0v.786a1 1 0 0 0 .56.9l8 3.925a1 1 0 0 0 .88 0l8-3.925a1 1 0 0 0 .56-.9v-.786a1 1 0 0 0-1-1Z" />{' '}
                <path d="M17.993 13.191a1 1 0 0 0-1 1v.163l-7 3.435-7-3.435v-.163a1 1 0 1 0-2 0v.787a1 1 0 0 0 .56.9l8 3.925a1 1 0 0 0 .88 0l8-3.925a1 1 0 0 0 .56-.9v-.787a1 1 0 0 0-1-1Z" />{' '}
              </svg>
              Mi Closet
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setIsCollapsed(false)}
              href={`/member/${user?.username}/favorites`}
              className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 "
            >
              <svg
                className="mr-2 w-4 h-4 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
              </svg>
              Mis favoritos
            </Link>
          </li>
        </ul>
        <ul className="py-1 text-gray-500 " aria-labelledby="dropdown">
          <li>
            <button
              onClick={logout}
              className="block w-full py-2 px-4 text-sm hover:bg-gray-100 text-left"
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
