'use client';
import { useSidebar } from '@/stores';

import { useEffect, useRef } from 'react';
import { CloseIcon } from '../../icons';
import { NavCategories } from '../NavCategories';

type Props = {
  filters: JSX.Element | JSX.Element;
};
const SidebarFilter = ({ filters }: Props) => {
  const menuFilterOpen = useSidebar((state) => state.sidebarFilterOpen);

  const setMenuFilterOpen = useSidebar((state) => state.onSidebarFilterOpen);

  const ref = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuFilterOpen();
  };

  useEffect(() => {
    const handler = (evt: any) => {
      if (menuFilterOpen && ref.current && !ref.current.contains(evt.target)) {
        setMenuFilterOpen();
      }
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [menuFilterOpen, setMenuFilterOpen]);

  return (
    <>
      <div
        ref={ref}
        className={`fixed h-screen w-3/4 bg-white transition-all duration-300 ease-in-out ${
          menuFilterOpen ? 'translate-x-0' : '-translate-x-full'
        } right-0 md:hidden z-50 overflow-y-scroll border-r shadow-sm`}
        style={{ left: 0, top: 0, bottom: 0 }}
      >
        <ul className="border-b shadow-sm h-16 w-full flex justify-end items-center pl-2">
          <p className="flex-1 text-center font-semibold">Filtrar</p>
          <button onClick={toggleMenu} className="w-8 h-8">
            <CloseIcon />
          </button>
        </ul>
        <ul className="mt-8 pb-8 mx-4 space-y-2">
          {/* <li className="">Filtrar</li> */}
          <ul className="">{filters}</ul>
          <li className="p-4">
            {/* <button
              onClick={toggleMenu}
              className="bg-cerise-red-500 text-white w-full rounded p-2"
            >
              Ver resultados
            </button> */}
          </li>
          <ul className="ml-2"></ul>
        </ul>
      </div>
    </>
  );
};

export default SidebarFilter;
