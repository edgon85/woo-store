'use client';

import { useFilter } from '@/hooks';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosMan, IoIosWoman, IoMdArrowDropright } from 'react-icons/io';

/* type Props = {
  selectGender: (gender: string) => void;
}; */

export const GenderSelected = () => {
  const { gender, setGender } = useFilter();

  // const [gender, setGender] = useState('mujer');
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

  const handleGender = (value: string) => {
    setIsCollapsed(false);
    setGender(value);
  };

  return (
    <div className="relative flex flex-col" ref={ref}>
      <button
        onClick={() => setIsCollapsed((prev) => !prev)}
        className="border w-44 hover:bg-gray-300 text-black font-medium text-sm p-2.5 text-center inline-flex items-center"
        type="button"
      >
        <span className="flex w-full justify-between gap-1 items-center capitalize">
          {gender}
          <IoMdArrowDropright size={24} />
        </span>
      </button>

      {isCollapsed && (
        <div className="z-10 absolute top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownDividerButton"
          >
            <li onClick={() => handleGender('mujer')}>
              <div className="flex gap-2 items-center px-4 py-2 hover:bg-gray-100 cursor-pointer ">
                <IoIosWoman size={20} /> <span>Mujer</span>
              </div>
            </li>
            <li onClick={() => handleGender('hombre')}>
              <div className="flex gap-2 items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <IoIosMan size={20} /> <span>Hombre</span>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
