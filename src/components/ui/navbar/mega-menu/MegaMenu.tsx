'use client';
import { useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { usePersonalPreferencesStore } from '@/stores';
import { DynamicCategoryMenu } from './';

export const MegaMenu = () => {
  const pathName = usePathname();
  const setGender = usePersonalPreferencesStore((state) => state.onSetGender);

  const updateGender = useCallback(() => {
    const pathParts = pathName.split('/').filter(Boolean);
    const genderIndex = pathParts.findIndex(
      (part) => part === 'mujer' || part === 'hombre'
    );

    if (genderIndex !== -1) {
      const gender = pathParts[genderIndex];
      setGender(gender);
    }
  }, [pathName, setGender]);

  useEffect(() => {
    updateGender();
  }, [updateGender]);

  return (
    <div
      id="mega-menu-icons"
      className="items-center justify-between hidden w-full md:flex md:w-auto"
    >
      <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
        {/* Ropa */}

        <DynamicCategoryMenu categoryType="ropa" displayName="Ropa" />
        {/* Zapatos */}
        <DynamicCategoryMenu categoryType="zapatos" displayName="Zapatos" />
        {/* Accesorios */}
        <DynamicCategoryMenu
          categoryType="accesorios"
          displayName="Accesorios"
        />
      </ul>
    </div>
  );
};
