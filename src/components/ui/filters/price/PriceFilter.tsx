'use client';
import { useForm } from 'react-hook-form';
import { Button } from '../../buttons';
import { Filter } from '@/interfaces';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { generateFilterURL } from '@/utils';
import { useFilterStore, useSidebar } from '@/stores';

type FormData = {
  min: number;
  max: number;
};

type Props = {
  isMobile?: boolean;
  isSearch?: boolean;
};

export const PriceFilter = ({ isMobile = false, isSearch = false }: Props) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get('s')?.toString();
  const gender = searchParams.get('gender')?.toString();

  const { replace } = useRouter();
  const menuFilter = useSidebar((state) => state.onSidebarFilterOpen);

  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const minPrice = Number(data.min);
    const maxPrice = Number(data.max);

    if (minPrice >= maxPrice) {
      setError('min', {
        type: 'manual',
        message: 'Min no puede ser mayor o igual que Max',
      });
      return;
    }

    const newFilter: Filter = {
      slug: `${data.min}-${data.max}`,
      title: `Q${data.min}-Q${data.max}`,
      type: 'price',
      priceRange: [minPrice, maxPrice],
    };

    const draft = filters.filter((item) => item.type !== 'price');

    setFilters([...draft, newFilter]);

    if (isMobile) {
      menuFilter();
    }
  };

  useEffect(() => {
    if (isSearch) {
      const url = generateFilterURL(filters, true, searchTerm, gender);
      replace(`${pathName}${url}`);
    } else {
      const url = generateFilterURL(filters);
      replace(`${pathName}${url}`);
    }
  }, [filters, gender, isSearch, pathName, replace, searchTerm]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className=" p-4 ">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Precio mínimo:</span>
          <input
            type="number"
            className="border rounded px-2 py-1 w-1/2 text-gray-800 outline-none"
            placeholder="Min"
            {...register('min', {
              required: 'requerido',
              min: 1,
            })}
          />
          {errors.min && (
            <span className="text-red-600">
              {errors.min.type === 'required' ? 'Requerido' : 'No válido'}
            </span>
          )}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Precio máximo:</span>
          <input
            type="number"
            className="border rounded px-2 py-1 w-1/2 text-gray-800 outline-none"
            placeholder="Max"
            {...register('max', {
              required: 'requerido',
              min: 50,
            })}
          />
          {errors.max && (
            <span className="text-red-600">
              {errors.max.type === 'required'
                ? 'Requerido'
                : 'No válido, valor mínimo 50'}
            </span>
          )}
        </div>

        {errors.min?.type === 'manual' && (
          <p className="text-red-600">{errors.min.message}</p>
        )}
        <div className="mt-2">
          <Button label="aplicar" type="submit" small />
        </div>
      </form>
    </>
  );
};
