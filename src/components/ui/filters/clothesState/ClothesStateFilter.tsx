'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Filter, IClothesState } from '@/interfaces';
import { useEffect } from 'react';
import { generateFilterURL } from '@/utils';
import { useFilterStore, useSidebar } from '@/stores';
import { useFetcher } from '@/hooks';

type Props = {
  isMobile?: boolean;
  isSearch?: boolean;
};

export const ClothesStateFilter = ({
  isMobile = false,
  isSearch = false,
}: Props) => {
  const { data: clothesStates } = useFetcher<IClothesState[]>(`/clothes-state`);

  const pathName = usePathname();
  const { replace } = useRouter();
  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);
  const menuFilter = useSidebar((state) => state.onSidebarFilterOpen);

  const searchParams = useSearchParams();

  const searchTerm = searchParams.get('s')?.toString();
  const gender = searchParams.get('gender')?.toString();

  const handleChange = (clothesState: IClothesState, isChecked: boolean) => {
    const newFilter: Filter = {
      slug: clothesState.slug,
      title: clothesState.title,
      type: 'clothesState',
    };

    let draft = structuredClone(filters);

    if (isChecked) {
      draft.push(newFilter);
      setFilters([...draft]);
      if (isMobile) {
        menuFilter();
      }
    } else {
      draft = draft.filter((resp) => newFilter.slug !== resp.slug);
      setFilters(draft);
    }
  };

  useEffect(() => {
    if (isSearch) {
      const url = generateFilterURL(filters, true, searchTerm, gender);
      replace(`${pathName}${url}`);
    } else {
      const url = generateFilterURL(filters);
      replace(`${pathName}${url}`);
    }
  }, [filters, gender, isSearch, pathName, replace, searchTerm]);

  return (
    <>
      <div className="divide-y divide-gray-300">
        {clothesStates.map((clothes) => (
          <li key={clothes.id} className="p-4">
            <label
              htmlFor={clothes.slug}
              className="flex justify-between items-center cursor-pointer hover:text-darkPrimary uppercase"
            >
              <span className="capitalize">{clothes.title}</span>
              <input
                name={clothes.title}
                value={clothes.title}
                className="w-5 h-5 bg-primary text-primary cursor-pointer"
                type="checkbox"
                id={clothes.slug}
                onChange={(e) => handleChange(clothes, e.target.checked)}
                checked={filters.some((filter) => filter.slug === clothes.slug)}
              />
            </label>
          </li>
        ))}
      </div>
    </>
  );
};
