'use client';

import { useState, useRef, useCallback, memo } from 'react';
import { IoMdArrowDropright, IoIosWoman, IoIosMan } from 'react-icons/io';
import { usePersonalPreferencesStore } from '@/stores';
import { useOnClickOutside } from '@/hooks';

const genderOptions = [
  { value: 'mujer', label: 'Mujer', Icon: IoIosWoman },
  { value: 'hombre', label: 'Hombre', Icon: IoIosMan },
];

export const GenderSelected = memo(() => {
  const gender = usePersonalPreferencesStore((state) => state.gender);
  const setGender = usePersonalPreferencesStore((state) => state.onSetGender);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setIsCollapsed(false));

  const toggleCollapsed = useCallback(
    () => setIsCollapsed((prev) => !prev),
    []
  );

  const handleGender = useCallback(
    (value: string) => {
      setIsCollapsed(false);
      setGender(value);
    },
    [setGender]
  );

  return (
    <div className="relative flex flex-col" ref={ref}>
      <button
        onClick={toggleCollapsed}
        className="border rounded w-32 md:w-44 hover:bg-gray-300 text-black font-medium text-sm p-2.5 text-center inline-flex items-center"
        type="button"
      >
        <span className="flex w-full justify-between gap-1 items-center capitalize">
          {gender}
          <IoMdArrowDropright size={24} />
        </span>
      </button>

      {isCollapsed && (
        <div className="z-10 absolute top-12 bg-white divide-y divide-gray-100 rounded shadow w-32 md:w-44">
          <ul className="py-2 text-sm text-gray-700">
            {genderOptions.map(({ value, label, Icon }) => (
              <li key={value} onClick={() => handleGender(value)}>
                <div className="flex gap-2 items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Icon size={20} /> <span>{label}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

GenderSelected.displayName = 'GenderSelected';
/* 
const gender = usePersonalPreferencesStore((state) => state.gender);
  const setGender = usePersonalPreferencesStore((state) => state.onSetGender);

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
*/
