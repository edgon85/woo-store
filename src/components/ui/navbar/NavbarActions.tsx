'use client';

import { useSession } from 'next-auth/react';
import { BtnCircle } from '../buttons';
import { DropdownAccount } from '../dropdowns';
import { BellIcon, SearchIcon } from '../icons';
import Link from 'next/link';

export const NavbarActions = () => {
  const session = useSession();

  const { status } = session;

  return (
    <div className="flex gap-2">
      {status === 'unauthenticated' && (
        <Link
          href={'/auth/login'}
          type="button"
          className="hidden lg:flex focus:outline-none text-white bg-[var(--primary)] hover:bg-pink-700  font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Inicia sesión | Regístrate
        </Link>
      )}
      <div className=" lg:hidden">
        <BtnCircle icon={<SearchIcon />} />
      </div>

      {status === 'authenticated' && (
        <>
          <DropdownAccount />

          <BtnCircle icon={<BellIcon />} />

          <button
            type="button"
            className="hidden lg:block focus:outline-none text-white bg-[var(--primary)] hover:bg-pink-700 font-medium rounded-lg text-sm px-5 py-2.5 "
          >
            VENDER AHORA
          </button>
        </>
      )}
    </div>
  );
};
