import { usePersonalPreferencesStore } from '@/stores';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

type FormInputData = {
  term: string;
};

export const InputSearch = () => {
  const gender = usePersonalPreferencesStore((state) => state.gender);

  const { register, handleSubmit, reset } = useForm<FormInputData>({
    defaultValues: {
      term: '',
    },
  });

  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const onHandleSubmit = useCallback(
    ({ term }: FormInputData) => {
      const params = new URLSearchParams(searchParams);

      if (term.trim()) {
        params.set('s', term.trim());
        params.set('gender', gender.trim());
        // params.set('clothesType', clothesType.trim());
      } else {
        params.delete('s');
        params.delete('gender');
        // params.delete('clothesType');
      }

      const url = params.toString();
      replace(`/search?${url}`);
      reset({ term: '' });
    },
    [gender, replace, searchParams, reset]
  );

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)}>
      <input
        type="search"
        id="search-dropdown"
        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-none border-s-transparent  border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
        placeholder={
          gender === 'mujer'
            ? 'Buscar artículos de mujer'
            : 'Buscar artículos de hombre'
        }
        defaultValue={searchParams.get('q')?.toString()}
        {...register('term', {
          required: true,
        })}
      />
      <button
        type="submit"
        className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-cerise-red-600 bg-gray-100 rounded-e-lg border border-gray-300 hover:bg-gray-200"
      >
        {IconSearch()}
        <span className="sr-only">Buscar</span>
      </button>
    </form>
  );
};

function IconSearch() {
  return (
    <svg
      className="w-4 h-4"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
      />
    </svg>
  );
}
