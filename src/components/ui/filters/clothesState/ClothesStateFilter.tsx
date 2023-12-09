'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Filter, IClothesState } from '@/interfaces';
import { useEffect } from 'react';
import { generateFilterURL } from '@/utils';
import { useFilterStore } from '@/stores';

type Props = {
  clothesStates: IClothesState[];
};

export const ClothesStateFilter = ({ clothesStates }: Props) => {
  const pathName = usePathname();
  const { replace } = useRouter();
  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);

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
    } else {
      draft = draft.filter((resp) => newFilter.slug !== resp.slug);
      setFilters(draft);
    }
  };

  useEffect(() => {
    const url = generateFilterURL(filters);
    replace(`${pathName}${url}`);
  }, [filters, pathName, replace]);

  return (
    <>
      <div className="divide-y divide-gray-300">
        {clothesStates.map((clothes) => (
          <li key={clothes.id} className="pl-1 pr-2 py-2">
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
