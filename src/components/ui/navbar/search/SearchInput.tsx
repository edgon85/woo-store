'use client';

import { useEffect, useRef, useState } from 'react';
import { GenderSelected } from '../../dropdowns';
import { InputSearch } from './InputSearch';

export const SearchInput = () => {
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
    <div className="w-full max-w-lg">
      <div className="flex w-full">
        <label
          htmlFor="search-dropdown"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          genero
        </label>
        <GenderSelected />
        <div className="relative flex-grow">
          <InputSearch />
        </div>
      </div>
    </div>
  );
};
