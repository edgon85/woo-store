'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  ClipboardDocumentIcon,
  CurrencyIcon,
  HangerIcon,
  HeartIcon,
  LogoutIcon,
  SettingsIcon,
  UserIcon,
} from '../icons';
import { DropdownItem } from './DropdownItem';

export const DropdownAccount = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative flex flex-col items-center " ref={ref}>
      <button
        onClick={() => setIsCollapsed((prev) => !prev)}
        id="dropdownDividerButton"
        data-dropdown-toggle="dropdownDivider"
        className="bg-gray-200 hover:bg-gray-300 text-black font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
        type="button"
      >
        <UserIcon />
      </button>

      {isCollapsed && (
        <div
          id="dropdownDivider"
          className="z-10 absolute top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 "
        >
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownDividerButton"
          >
            <DropdownItem title="Mi closet" icon={<HangerIcon />} />
            <DropdownItem
              title="Mis pedidos"
              icon={<ClipboardDocumentIcon />}
            />
            <DropdownItem title="Mi balance" icon={<CurrencyIcon />} />
            <DropdownItem title="Mis favoritos" icon={<HeartIcon />} />
            <DropdownItem title="Configuración" icon={<SettingsIcon />} />
          </ul>
          <div className="py-2">
            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
              <LogoutIcon />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
