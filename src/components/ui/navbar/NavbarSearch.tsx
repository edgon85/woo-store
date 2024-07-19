'use client';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams, useRouter } from 'next/navigation';
import { IoIosArrowDown } from 'react-icons/io';
import { usePersonalPreferencesStore } from '@/stores';
import { SearchIcon } from '../icons';

type FormInputData = {
  term: string;
  clothesType: string;
};

const clothesTypeOptions = [
  { value: 'ropa', label: 'Ropa' },
  { value: 'zapatos', label: 'Zapatos' },
  { value: 'accesorios', label: 'Accesorios' },
];

export const NavbarSearch = () => {
  const { gender, clothesType, setClothesType } = usePersonalPreferencesStore(
    useCallback(
      (state) => ({
        gender: state.gender,
        clothesType: state.clothesType,
        setClothesType: state.setClothesType,
      }),
      []
    )
  );

  const { register, handleSubmit } = useForm<FormInputData>({
    defaultValues: {
      term: '',
      clothesType: clothesType,
    },
  });

  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const onClothesChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setClothesType(event.target.value);
    },
    [setClothesType]
  );

  const onHandleSubmit = useCallback(
    ({ term }: FormInputData) => {
      const params = new URLSearchParams(searchParams);
      if (term.trim()) {
        params.set('query', term.trim());
      } else {
        params.delete('query');
      }
      replace(`/search/${gender}/${clothesType}?${params.toString()}`);
    },
    [gender, clothesType, searchParams, replace]
  );

  return (
    <form
      onSubmit={handleSubmit(onHandleSubmit)}
      className="w-96 lg:w-[500px] border rounded-md overflow-hidden pr-1 bg-white"
    >
      <div className="flex">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 outline-none bg-white"
            placeholder="Buscar..."
            defaultValue={searchParams.get('query')?.toString()}
            {...register('term')}
          />
        </div>
        <div className="flex">
          <select
            id="clothes-type"
            className="appearance-none border-l pl-2 text-gray-900 text-sm outline-none"
            {...register('clothesType')}
            onChange={onClothesChange}
          >
            {clothesTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="self-center">
            <IoIosArrowDown />
          </p>
        </div>
      </div>
    </form>
  );
};
