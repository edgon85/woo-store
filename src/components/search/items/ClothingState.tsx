'use client';

import { Filter } from '@/interfaces';
import {
  useFilterStore,
  usePersonalPreferencesStore,
  useSidebar,
} from '@/stores';
import { generateFilterURL } from '@/utils';
import clsx from 'clsx';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { RadioButtonOff, RadioButtonOn } from '@/components/ui';

const ClothingOptions = [
  { id: 'ropa', slug: 'ropa', name: 'Ropa' },
  { id: 'zapatos', slug: 'zapatos', name: 'Zapatos' },
  { id: 'accesorios', slug: 'accesorios', name: 'Accesorios' },
];

type Props = {
  isMobile?: boolean;
  isSearch?: boolean;
};

export const ClothingTypeSearch = ({
  isMobile = false,
  isSearch = false,
}: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get('s')?.toString();
  const gender = searchParams.get('gender')?.toString();

  const { replace } = useRouter();

  const clothesType = usePersonalPreferencesStore((state) => state.clothesType);
  const setClothesType = usePersonalPreferencesStore(
    (state) => state.setClothesType
  );
  const menuFilter = useSidebar((state) => state.onSidebarFilterOpen);
  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);

  const onHandleClick = (slug: string) => {
    let updatedFilters = filters.filter(
      (filter) => filter.type !== 'clothesType'
    );

    if (slug !== clothesType) {
      const newFilter: Filter = {
        slug: slug,
        title: 'clothesType',
        type: 'clothesType',
      };
      updatedFilters.push(newFilter);
      setClothesType(slug);
      if (isMobile) menuFilter();
    } else {
      setClothesType('ropa');
    }

    setFilters(updatedFilters);
  };

  useEffect(() => {
    const url = isSearch
      ? generateFilterURL(filters, true, searchTerm, gender)
      : generateFilterURL(filters);
    replace(`${pathname}${url}`);
  }, [filters, gender, isSearch, searchTerm, pathname, replace]);

  return (
    <div className="divide-y divide-gray-300">
      {ClothingOptions.map((clothing) => (
        <li key={clothing.id} className="p-4">
          <button
            onClick={() => onHandleClick(clothing.slug)}
            className={clsx('flex justify-between w-full', {
              'text-cerise-red-600': clothesType === clothing.slug,
              'text-gray-700': clothesType !== clothing.slug,
            })}
          >
            <span>{clothing.name}</span>
            <span>
              {clothesType === clothing.slug ? (
                <RadioButtonOn />
              ) : (
                <RadioButtonOff />
              )}
            </span>
          </button>
        </li>
      ))}
    </div>
  );
};
