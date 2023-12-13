'use client';

import { SearchIcon } from '@/components/ui';
import { getBrandData } from '@/helpers/httpHelper';
import { useDebounce } from '@/hooks/useDebounce';
import { IBrand } from '@/interfaces';
import { ChangeEvent, useEffect, useState } from 'react';
import { IoIosCheckmark } from 'react-icons/io';
import { CreateBrand } from './CreateBrand';
import { useCreateProductStore, useModalStore } from '@/stores';

export const BrandSelect = () => {
  const closeModal = useModalStore((state) => state.closeModal);
  const setBrand = useCreateProductStore((state) => state.setBrand);
  const selectedBrand = useCreateProductStore((state) => state.brand);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<IBrand[]>([]);
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
    await getBrandData(query).then((data) => {
      setSearchResults(data);
      setLoading(false);
    });
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
        {loading ? (
          <>
            <span>...</span>
          </>
        ) : (
          <SearchIcon color="var(--divider)" />
        )}
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
          className={`flex justify-between items-center 
          ${selectedBrand?.id === brand.id ? 'text-darkPrimary' : 'text-black'}
              border-b py-4 cursor-pointer`}
        >
          <span className="capitalize">{brand.title}</span>
          {selectedBrand?.id === brand.id ? (
            <IoIosCheckmark size={24} color="var(--primary)" />
          ) : null}
        </div>
      ))}
    </div>
  );
};
