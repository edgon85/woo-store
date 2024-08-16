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
  const router = useRouter();
  const gender = usePersonalPreferencesStore((state) => state.gender);
  const clothesType = usePersonalPreferencesStore((state) => state.clothesType);
  const setClothesType = usePersonalPreferencesStore(
    (state) => state.setClothesType
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
      router.push(`/catalog/${gender}/${clothesType}`);
    },
    [setClothesType, gender, router, clothesType]
  );

  const onHandleSubmit = useCallback(
    ({ term }: FormInputData) => {
      const params = new URLSearchParams(searchParams);
      if (term.trim()) {
        params.set('s', term.trim());
        params.set('gender', gender.trim());
        params.set('clothesType', clothesType.trim());
      } else {
        params.delete('s');
        params.delete('gender');
        params.delete('clothesType');
      }

      const url = params.toString();
      console.log(url);
      replace(`/search?${url}`);
    },
    [clothesType, gender, replace, searchParams]
  );

  return (
    <form
      onSubmit={handleSubmit(onHandleSubmit)}
      className="w-96 lg:w-[500px] border rounded-md overflow-hidden pr-1 bg-white"
    >
      <div className="flex">
        <div className="flex-1 relative">
          <button
            type="submit"
            className="absolute inset-y-0 start-0 flex items-center ps-3"
          >
            <SearchIcon />
          </button>
          <input
            type="text"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 outline-none bg-white"
            placeholder="Buscar..."
            defaultValue={searchParams.get('query')?.toString()}
            {...(register('term'), { required: true })}
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
