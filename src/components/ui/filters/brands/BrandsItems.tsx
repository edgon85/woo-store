'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { Filter, IBrand } from '@/interfaces';
import { getBrandData } from '@/helpers';
import { useDebounce } from '@/hooks/useDebounce';
import { generateFilterURL } from '@/utils';
import { useFilterStore } from '@/stores';

type Props = {
  brands: IBrand[];
};

export const BrandsItems = ({ brands }: Props) => {
  const pathName = usePathname();
  const { replace } = useRouter();

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
    await getBrandData(query).then((data) => {
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
};
