'use client';
import { useSidebar } from '@/stores';
import { ButtonCellNow } from './ButtonCellNow';
import { ButtonRegister } from './ButtonRegister';

import { MenuItem } from '../../filters/NavItems';
import { ClothesList } from './clothes/ClothesList';
import { ArrowRightIcon, ListGroup } from '@/components';

import clsx from 'clsx';
import { useAuthStore } from '@/stores/auth.store';

const Sidebar = () => {
  const menuOpen = useSidebar((state) => state.sidebarOpen);
  const setMenuOpen = useSidebar((state) => state.onSidebarOpen);
  // const { user } = useAuth();
  const user = useAuthStore((state) => state.user);

  return (
    <>
      {menuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black opacity-30" />
      )}

      {menuOpen && (
        <div
          onClick={setMenuOpen}
          className="fixed top-0 left-0 w-screen h-screen z-50 backdrop-filter backdrop-blur-sm transition-all duration-300 ease-in-out"
        />
      )}

      {/* Sidebar */}
      <div
        className={clsx(
          'fixed top-0 right-0 h-screen w-3/4 bg-white transition-all duration-300 ease-in-out  md:hidden z-50 overflow-y-scroll',
          {
            'translate-x-full': !menuOpen,
          }
        )}
      >
        <ul className="border-b shadow-sm h-16 w-full flex justify-start items-center pl-2">
          <button onClick={setMenuOpen} className="w-8 h-8">
            <ArrowRightIcon />
          </button>
        </ul>
        <ul className="mt-8 pb-8 mx-4 space-y-2">
          <li>
            <ButtonCellNow />
          </li>
          {!user && (
            <li className="mt-2">
              <ButtonRegister />
            </li>
          )}

          <li className="text-center text-lg font-semibold">Categorías</li>
          <ul>
            <MenuItem
              title={'Ropa'}
              items={<ClothesList articleType="ropa" />}
            />
            <MenuItem
              title={'Zapatos'}
              items={<ClothesList articleType="zapatos" />}
            />
            <MenuItem
              title={'Accesorios'}
              items={<ClothesList articleType="accesorios" />}
            />
          </ul>
          {user && (
            <>
              <li className="text-center text-lg font-semibold">Ajustes</li>
              <ul>
                <ListGroup userId={user?.id!} isMobile={true} />
              </ul>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
