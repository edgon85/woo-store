'use client';

import { Filter, IColor } from '@/interfaces';
import { useFilterStore, useSidebar } from '@/stores';
import { generateFilterURL } from '@/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

type Props = {
  colors: IColor[];
  isMovil?: boolean;
};

export const ColorFilter = ({ colors, isMovil = false }: Props) => {
  const pathName = usePathname();
  const { replace } = useRouter();

  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);
  const menuFilter = useSidebar((state) => state.onSidebarFilterOpen);

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
      if (isMovil) {
        menuFilter();
      }
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
