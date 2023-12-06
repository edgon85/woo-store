'use client';

import { BtnCircle } from '../buttons';
import { DropdownAccount } from '../dropdowns';
import { BellIcon, SearchIcon } from '../icons';
import Link from 'next/link';
import { useAuth } from '@/hooks';
import { usePathname, useRouter } from 'next/navigation';

export const NavbarActions = () => {
  const path = usePathname();
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  return (
    <div className="flex gap-2">
      {!isLoggedIn && (
        <Link
          href={`/auth/login?p=${path}`}
          type="button"
          className="hidden md:flex focus:outline-none text-white bg-[var(--primary)] hover:bg-pink-700  font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Inicia sesión | Regístrate
        </Link>
      )}
      <div className=" md:hidden">
        <BtnCircle icon={<SearchIcon />} />
      </div>

      {isLoggedIn && (
        <>
          <DropdownAccount />

          <BtnCircle icon={<BellIcon />} />

          <button
            onClick={() => router.push('/products/create')}
            type="button"
            className="hidden md:block focus:outline-none text-white bg-[var(--primary)] hover:bg-pink-700 font-medium rounded-lg text-sm px-5 py-2.5 "
          >
            VENDER AHORA
          </button>
        </>
      )}
    </div>
  );
};
