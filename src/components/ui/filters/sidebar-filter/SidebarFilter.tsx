'use client';

import { useSidebar } from '@/stores';
import { CloseIcon } from '../../icons';
import clsx from 'clsx';
import { useEffect } from 'react';

type Props = {
  filters: JSX.Element | JSX.Element;
};
const SidebarFilter = ({ filters }: Props) => {
  const menuFilterOpen = useSidebar((state) => state.sidebarFilterOpen);
  const setMenuFilterOpen = useSidebar((state) => state.onSidebarFilterOpen);

  useEffect(() => {
    if (menuFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuFilterOpen]);

  return (
    <>
      {menuFilterOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black opacity-30" />
      )}

      {menuFilterOpen && (
        <div
          onClick={setMenuFilterOpen}
          className="fixed top-0 left-0 w-screen h-screen z-50 backdrop-filter backdrop-blur-sm transition-all duration-300 ease-in-out"
        />
      )}

      <div
        className={clsx(
          'fixed left-0 top-0 h-screen w-3/4 bg-white transition-all duration-300 ease-in-out md:hidden z-50 overflow-y-auto border-r shadow-sm',
          {
            '-translate-x-full': !menuFilterOpen,
          }
        )}
      >
        <div className="flex flex-col h-full">
          <div className="border-b shadow-sm h-16 w-full flex justify-end items-center pl-2 flex-shrink-0">
            <p className="flex-1 text-center font-semibold">Filtrar</p>
            <button
              onClick={setMenuFilterOpen}
              className="w-8 h-8"
              aria-label="filter"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto">
            <ul className="mt-8 pb-8 mx-4 space-y-2">
              <li>{filters}</li>
              <li className="ml-2"></li>
            </ul>
            <div className="h-20"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarFilter;
