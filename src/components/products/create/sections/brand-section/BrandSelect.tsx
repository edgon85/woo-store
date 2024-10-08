'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import clsx from 'clsx';

import { CheckMark, SearchIcon, SpinnerIcon } from '@/components/ui';
import { useDebounce } from '@/hooks/useDebounce';
import { IBrand } from '@/interfaces';
import { CreateBrand } from './CreateBrand';
import { useCreateProductStore, useModalStore } from '@/stores';
import { getBrands } from '@/actions';

type Props = {
  brands: IBrand[];
};

export const BrandSelect = ({ brands }: Props) => {
  const closeModal = useModalStore((state) => state.closeModal);
  const setBrand = useCreateProductStore((state) => state.setBrand);
  const selectedBrand = useCreateProductStore((state) => state.brand);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<IBrand[]>(brands);
  const [loading, setLoading] = useState(false);

  const { debounceValue: debounceSearch } = useDebounce(searchQuery, 500);

  useEffect(() => {
    performSearch(debounceSearch);
  }, [debounceSearch]);

  const handleClick = (brand: IBrand) => {
    setBrand(brand);
    setSearchQuery('');
    closeModal();
  };

  const handleOnchange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value.toLowerCase());
  };

  const performSearch = async (query: string) => {
    setLoading(true);
    const searchBrands = await getBrands(query);
    setSearchResults(searchBrands);
    setLoading(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center border border-divider rounded-md justify-center pr-2 mb-1">
        <input
          type="text"
          id="title"
          value={searchQuery}
          className="block w-full p-4 text-gray-900 sm:text-md rounded-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
          placeholder="Buscar marcas"
          onChange={handleOnchange}
        />
        <SearchIcon className="text-gray-400 w-6 h-6" />
        {/* {loading ? (
          <>
            {/ * <SpinnerIcon className="w-6 h-6 animate-spin" /> * /}
          </>
        ) : (
          <SearchIcon className="text-gray-400 w-6 h-6" />
        )} */}
      </div>
      {searchResults.length === 0 ? (
        <CreateBrand
          name={searchQuery}
          setBrand={setBrand}
          setSearchQuery={setSearchQuery}
        />
      ) : null}
      {searchResults.map((brand: IBrand) => (
        <div
          onClick={() => handleClick(brand)}
          key={brand.id}
          className={clsx(
            'flex justify-between items-center border-b py-4 cursor-pointer',
            {
              'text-cerise-red-600': selectedBrand?.id === brand.id,
            }
          )}
        >
          <span className="capitalize">{brand.title}</span>
          {selectedBrand?.id === brand.id ? (
            <CheckMark className="text-cerise-red-600 w-6 h-6" />
          ) : null}
        </div>
      ))}
    </div>
  );
};
