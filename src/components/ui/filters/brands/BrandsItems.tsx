'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Filter, IBrand } from '@/interfaces';
import { useDebounce } from '@/hooks/useDebounce';
import { generateFilterURL } from '@/utils';
import { useFilterStore, useSidebar } from '@/stores';
import { getBrands } from '@/actions';
import { useFetcher } from '@/hooks';

type Props = {
  isMobile?: boolean;
};

export const BrandsItems = ({ isMobile = false }: Props) => {
  const { data: initialBrands = [] } = useFetcher<IBrand[]>(
    '/brands/all?take=15'
  );
  const pathname = usePathname();
  const { replace } = useRouter();

  const menuFilter = useSidebar((state) => state.onSidebarFilterOpen);
  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);

  const prevFiltersRef = useRef(filters);

  const [searchQuery, setSearchQuery] = useState('');
  const { debounceValue: debouncedSearch } = useDebounce(searchQuery, 500);

  const [searchResults, setSearchResults] = useState<IBrand[]>(initialBrands);

  const performSearch = useCallback(
    async (query: string) => {
      if (query === '') {
        setSearchResults(initialBrands);
      } else {
        const data = await getBrands(query);
        setSearchResults(data);
      }
    },
    [initialBrands]
  );

  useEffect(() => {
    performSearch(debouncedSearch);
  }, [debouncedSearch, performSearch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleChange = useCallback(
    (brandFilter: IBrand, isChecked: boolean) => {
      const newFilter: Filter = {
        slug: brandFilter.slug,
        title: brandFilter.title,
        type: 'brands',
      };

      setFilters((prevFilters: Filter[]) => {
        if (isChecked) {
          if (isMobile) menuFilter();
          return [...prevFilters, newFilter];
        } else {
          return prevFilters.filter((filter) => filter.slug !== newFilter.slug);
        }
      });
    },
    [setFilters, isMobile, menuFilter]
  );

  const brandItems = useMemo(
    () =>
      searchResults.map((brandData) => (
        <li key={brandData.id} className="p-4">
          <label
            htmlFor={brandData.slug}
            className="flex justify-between items-center cursor-pointer hover:text-darkPrimary capitalize"
          >
            <span>{brandData.title}</span>
            <input
              name={brandData.title}
              value={brandData.slug}
              className="w-5 h-5 bg-primary text-primary cursor-pointer"
              type="checkbox"
              id={brandData.slug}
              onChange={(e) => handleChange(brandData, e.target.checked)}
              checked={filters.some((brand) => brand.slug === brandData.slug)}
            />
          </label>
        </li>
      )),
    [searchResults, filters, handleChange]
  );

  useEffect(() => {
    if (JSON.stringify(prevFiltersRef.current) !== JSON.stringify(filters)) {
      const url = generateFilterURL(filters);
      replace(`${pathname}${url}`);
      prevFiltersRef.current = filters;
    }
  }, [filters, pathname, replace]);

  return (
    <div className="divide-y divide-gray-300">
      <input
        className="block w-full mt-2 mb-2 p-2 text-gray-900 sm:text-md rounded-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
        type="text"
        placeholder="Buscar marca"
        onChange={handleInputChange}
      />
      {brandItems}
    </div>
  );
};
