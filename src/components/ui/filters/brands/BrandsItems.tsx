'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
  const { data: brands = [] } = useFetcher<IBrand[]>('/brands/all?take=15');
  const pathname = usePathname();
  const { replace } = useRouter();

  const menuFilter = useSidebar((state) => state.onSidebarFilterOpen);
  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);

  const [searchQuery, setSearchQuery] = useState('');
  const { debounceValue: debouncedSearch } = useDebounce(searchQuery, 500);

  const [searchResults, setSearchResults] = useState<IBrand[]>(brands);

  const performSearch = useCallback(
    async (query: string) => {
      if (query === '') {
        setSearchResults(brands);
      } else {
        const data = await getBrands(query);
        setSearchResults(data);
      }
    },
    [brands]
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

      if (isChecked) {
        if (isMobile) menuFilter();
        setFilters([...filters, newFilter]);
      } else {
        setFilters(filters.filter((filter) => filter.slug !== newFilter.slug));
      }
    },
    [filters, setFilters, isMobile, menuFilter]
  );

  useEffect(() => {
    const url = generateFilterURL(filters);
    replace(`${pathname}${url}`);
  }, [filters, pathname, replace]);

  const brandItems = useMemo(
    () =>
      searchResults.map((brandData) => (
        <li key={brandData.id} className="pl-1 pr-2 py-2">
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

/* 
 const { data: brands } = useFetcher<IBrand[]>(`/brands/all?take=15`);

  const pathName = usePathname();
  const { replace } = useRouter();

  const menuFilter = useSidebar((state) => state.onSidebarFilterOpen);
  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<IBrand[]>([]);
  const { debounceValue: debounceSearch } = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (searchQuery === '') {
      setSearchResults(brands);
    } else {
      performSearch(debounceSearch);
    }
  }, [brands, debounceSearch, searchQuery]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value.toLowerCase());
  };

  const performSearch = async (query: string) => {
    await getBrands(query).then((data) => {
      setSearchResults(data);
    });
  };

  const handleChange = (brandFilter: IBrand, isChecked: boolean) => {
    const newFilter: Filter = {
      slug: brandFilter.slug,
      title: brandFilter.title,
      type: 'brands',
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
    <>
      <div className="divide-y divide-gray-300">
        <input
          className="block w-full mt-2 mb-2 p-2 text-gray-900 sm:text-md rounded-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
          type="text"
          placeholder="Buscar marca"
          onChange={handleInputChange}
        />
        {searchResults.map((brandData) => (
          <li key={brandData.id} className="pl-1 pr-2 py-2">
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
        ))}
      </div>
    </>
  );

*/
