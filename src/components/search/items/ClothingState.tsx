import { useFetcher } from '@/hooks';
import { IClothesState, Filter } from '@/interfaces';
import { useFilterStore, useSidebar } from '@/stores';
import { generateFilterURL } from '@/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Props = {
  isMovil?: boolean;
};

export const ClothingStateItem = ({ isMovil = false }: Props) => {
  const { data: clothesStates } = useFetcher<IClothesState[]>(`/clothes-state`);
  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);
  const menuFilter = useSidebar((state) => state.onSidebarFilterOpen);
  const { replace } = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');

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
      if (isMovil) {
        menuFilter();
      }
    } else {
      draft = draft.filter((resp) => newFilter.slug !== resp.slug);
      setFilters(draft);
    }
  };

  useEffect(() => {
    const term = searchParams.get('q') || '';
    setSearchTerm(term);
    const newFilter: Filter = {
      slug: term,
      title: term,
      type: 'search',
    };
    console.log({ term });
    // Recuperar filtros de la URL

    setFilters([...filters, newFilter]);

    // Realizar la búsqueda
  }, [searchParams, setFilters]);

  useEffect(() => {
    /*  console.log(searchParams.get('q'));
    const url = generateFilterURL(filters);
    console.log(`${pathName}${url}`); */
    console.log(filters);
    /* console.log(pathName);
    console.log(url); */
  }, [filters]);

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
                // checked={filters.some((filter) => filter.slug === clothes.slug)}
              />
            </label>
          </li>
        ))}
      </div>
    </>
  );
};
