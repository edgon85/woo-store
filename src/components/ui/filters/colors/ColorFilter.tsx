'use client';

import { useFetcher } from '@/hooks';
import { Filter, IColor } from '@/interfaces';
import { useFilterStore, useSidebar } from '@/stores';
import { generateFilterURL } from '@/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type Props = {
  isMobile?: boolean;
  isSearch?: boolean;
  colors: any[];
};

export const ColorFilter = ({
  isMobile = false,
  isSearch = false,
  colors,
}: Props) => {
  // const { data: colors } = useFetcher<IColor[]>(`/colors`);

  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);
  const menuFilter = useSidebar((state) => state.onSidebarFilterOpen);

  const searchTerm = searchParams.get('s')?.toString();
  const gender = searchParams.get('gender')?.toString();

  const handleChange = (colorItem: IColor, isChecked: boolean) => {
    const newFilter: Filter = {
      slug: colorItem.slug,
      title: colorItem.name,
      type: 'colors',
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
    <div className="grid grid-cols-3 gap-4 p-2">
      {colors.map((color) => {
        const codeColor = `#${color.codeColor}`;
        return (
          <li key={color.id}>
            <label htmlFor={color.slug} className="text-center cursor-pointer">
              <div
                className={`w-14 h-14  rounded-full mx-auto
                ${
                  filters.some((filter) => filter.slug === color.slug)
                    ? 'border border-red-950'
                    : ''
                }`}
                style={{
                  background: `${
                    codeColor === 'multicolor'
                      ? 'radial-gradient(red, orange, #ff0, pink, black, #00f, purple, red)'
                      : codeColor
                  }`,
                }}
              ></div>
              <div className="mt-2 capitalize">{color.name}</div>
              <input
                name={color.name}
                value={color.name}
                className="hidden"
                type="checkbox"
                id={color.slug}
                onChange={(e) => handleChange(color, e.target.checked)}
                checked={filters.some((filter) => filter.slug === color.slug)}
              />
            </label>
          </li>
        );
      })}
    </div>
  );
};
