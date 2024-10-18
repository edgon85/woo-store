'use client';
import { usePersonalPreferencesStore, useSidebar } from '@/stores';
import { ButtonCellNow } from './ButtonCellNow';
import { ButtonRegister } from './ButtonRegister';

import { MenuItem } from '../../filters/NavItems';
import { ClothesList } from './clothes/ClothesList';
import { ArrowRightIcon, ListGroup, SidebarHelp } from '@/components';

import clsx from 'clsx';
import { useAuthStore } from '@/stores/auth.store';
import { useEffect, useState } from 'react';
import { ICategory } from '@/interfaces';
import { getCategories } from '@/actions/categories';

const Sidebar = () => {
  const menuOpen = useSidebar((state) => state.sidebarOpen);
  const setMenuOpen = useSidebar((state) => state.onSidebarOpen);
  const user = useAuthStore((state) => state.user);
  const [categories, setCategories] = useState<{ [key: string]: ICategory[] }>(
    {}
  );
  const gender = usePersonalPreferencesStore((state) => state.gender);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      const articleTypes = ['ropa', 'zapatos', 'accesorios'];
      const categoriesData: { [key: string]: ICategory[] } = {};

      for (const articleType of articleTypes) {
        const { ok, categories } = await getCategories(gender, articleType);
        if (ok) {
          categoriesData[articleType] = categories;
        }
      }

      setCategories(categoriesData);
    };

    fetchAllCategories();
  }, [gender]);

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
          'fixed top-0 right-0 h-screen w-3/4 bg-white transition-all duration-300 ease-in-out md:hidden z-50 overflow-y-auto',
          {
            'translate-x-full': !menuOpen,
          }
        )}
      >
        <div className="flex flex-col h-full">
          <ul className="border-b shadow-sm h-16 w-full flex justify-start items-center pl-2 flex-shrink-0">
            <li>
              <button
                onClick={setMenuOpen}
                className="w-8 h-8"
                aria-label="menu"
              >
                <ArrowRightIcon />
              </button>
            </li>
          </ul>
          <div className="flex-grow overflow-y-auto">
            <ul className="mt-8 pb-8 mx-4 space-y-2">
              {user && (
                <li className="mt-2">
                  <ButtonCellNow />
                </li>
              )}
              {!user && (
                <li className="mt-2">
                  <ButtonRegister />
                </li>
              )}

              <li className="text-center text-lg font-semibold">Categorías</li>

              <MenuItem
                title={'Ropa'}
                items={
                  <ClothesList
                    articleType="ropa"
                    categories={categories['ropa'] || []}
                  />
                }
              />
              <MenuItem
                title={'Zapatos'}
                items={
                  <ClothesList
                    articleType="zapatos"
                    categories={categories['zapatos'] || []}
                  />
                }
              />
              <MenuItem
                title={'Accesorios'}
                items={
                  <ClothesList
                    articleType="accesorios"
                    categories={categories['accesorios'] || []}
                  />
                }
              />
            </ul>
            {user && (
              <div>
                <p className="text-center text-lg font-semibold">Ajustes</p>

                <ListGroup userId={user?.id!} isMobile={true} />
              </div>
            )}

            <SidebarHelp isMobile={true} />

            <div className="h-20"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
