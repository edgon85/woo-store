'use client';

import { useState, useRef, useCallback, memo } from 'react';
import { usePersonalPreferencesStore } from '@/stores';
import { useOnClickOutside } from '@/hooks';
import { ManIcon, WomanIcon } from '../icons';

const genderOptions = [
  { value: 'mujer', label: 'Mujer', Icon: WomanIcon },
  { value: 'hombre', label: 'Hombre', Icon: ManIcon },
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
      // router.push(`/catalog/${value}`);
    },
    [setGender]
  );

  return (
    <div className="relative" ref={ref}>
      <button
        id="dropdown-button"
        onClick={toggleCollapsed}
        data-dropdown-toggle="dropdown"
        className="flex-shrink-0 text-cerise-red-600 capitalize z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
        type="button"
      >
        {gender}
        <svg
          className="w-2.5 h-2.5 ms-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdown"
        className={`${
          isCollapsed ? 'block' : 'hidden'
        } absolute left-0 mt-1 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
      >
        <ul
          className="py-2 text-sm text-gray-700"
          aria-labelledby="dropdown-button"
        >
          {genderOptions.map(({ value, label, Icon }) => (
            <li key={value} onClick={() => handleGender(value)}>
              <button
                type="button"
                onClick={() => setIsCollapsed(false)}
                className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
              >
                <Icon className="w-5 h-5" /> <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

GenderSelected.displayName = 'GenderSelected';
