import { useForm } from 'react-hook-form';
import { Button } from '../../buttons';
import { Filter } from '@/interfaces';
import { useFilter } from '@/hooks';
import { useRouter } from 'next/navigation';

type FormData = {
  min: number;
  max: number;
};

export const PriceFilter = () => {
  const router = useRouter();
  const { gender, category, subcategory, clothesType, filters, setFilters } =
    useFilter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const subCatPath = subcategory.id !== '' ? `/${subcategory.slug}` : '';
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
    const slugs = draft.map((item) => item.slug);
    setFilters([...draft, newFilter]);

    // draft.length !== 0  ?
    router.push(
      `/catalog/${gender}/${category.slug}${subCatPath}?filter=${[
        ...slugs,
      ].join(',')}`
    );
    // : router.push(`/${gender}/${category.slug}${subCatPath}`);
  };

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
              min: 0,
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
