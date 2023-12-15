'use client';

import { BtnCircle } from '../buttons';
import { DropdownAccount } from '../dropdowns';
import { BellIcon } from '../icons';
import Link from 'next/link';
import { useAuth } from '@/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { useSidebar } from '@/stores';

export const NavbarActions = () => {
  const path = usePathname();
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const setMenuOpen = useSidebar((state) => state.onSidebarOpen);

  return (
    <div className="flex gap-1">
      {!isLoggedIn && (
        <Link
          href={`/auth/login?p=${path}`}
          type="button"
          className="hidden md:flex focus:outline-none text-white bg-cerise-red-600 hover:bg-cerise-red-500 font-medium rounded text-sm px-5 py-2.5"
        >
          Inicia sesión | Regístrate
        </Link>
      )}
      <div className=" md:hidden"></div>

      <>
        {isLoggedIn && <DropdownAccount />}

        {isLoggedIn && <BtnCircle icon={<BellIcon />} />}

        <button
          className="px-2 rounded-lg inline-block md:hidden"
          onClick={setMenuOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {isLoggedIn && (
          <button
            onClick={() => router.push('/products/create')}
            type="button"
            className="hidden md:block focus:outline-none text-white bg-cerise-red-600 hover:bg-cerise-red-500 font-medium rounded-lg text-sm px-5 py-2.5 "
          >
            VENDER AHORA
          </button>
        )}
      </>
    </div>
  );
};
