'use client';
import { SearchIcon } from '../icons';
import { IoIosArrowDown } from 'react-icons/io';
import { usePersonalPreferencesStore } from '@/stores';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

type FormInputData = {
  term: string;
  clothesType: string;
};

export const NavbarSearch = () => {
  const gender = usePersonalPreferencesStore((state) => state.gender);
  const clothesType = usePersonalPreferencesStore((state) => state.clothesType);
  const setClothesType = usePersonalPreferencesStore(
    (state) => state.setClothesType
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputData>();

  const searchParams = useSearchParams();

  const { replace } = useRouter();

  const onClothesChange = (value: string) => {
    setClothesType(value);
  };
  const onHandleSubmit = ({ term }: FormInputData) => {
    // Cookies.set('clothesType', 'ropa');
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term.trim());
    } else {
      params.delete('query');
    }
    replace(`/search/${gender}/${clothesType}?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onHandleSubmit)}
      className="w-96 lg:w-[500px] border rounded-md overflow-hidden pr-1 bg-white"
    >
      <div className=" flex">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 outline-none bg-white"
            placeholder="Buscar..."
            // onChange={(e) => handleChange(e.target.value)}
            defaultValue={searchParams.get('query')?.toString()}
            {...register('term')}
          />
        </div>
        <div className="flex">
          <select
            id="countries"
            defaultValue={clothesType}
            className="appearance-none border-l pl-2 text-gray-900 text-sm  outline-none"
            {...register('clothesType')}
            onChange={(e) => onClothesChange(e.target.value)}
          >
            <option value="ropa">Ropa</option>
            <option value="zapatos">zapatos</option>
            <option value="accesorios">Accesorios</option>
          </select>
          <p className="self-center">
            <IoIosArrowDown />
          </p>
        </div>
      </div>
    </form>
  );
};
