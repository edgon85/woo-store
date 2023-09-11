import Cookies from 'js-cookie';

import { RadiaSelectIcon } from '../icons';
import { useFilter, useFetcher } from '@/hooks';
import { ICategory, ISubcategory } from '@/interfaces';

import { useRouter } from 'next/navigation';

export const CategoriesItem = () => {
  const { gender, category, subcategory, setSubcategory, setBrands } =
    useFilter();
  const router = useRouter();

  const { data: subcategories, isLoading: loading } = useFetcher<ICategory[]>(
    `/subcategories?category=${category.id}`
  );

  const handleChange = (currentSubcategory: ISubcategory) => {
    if (currentSubcategory.id === subcategory.id) {
      setSubcategory({ id: '', title: '', slug: '' });
      router.push(`/${gender}/${category.slug}`);
      Cookies.remove('subcategory');
      setBrands([]);
    } else {
      setSubcategory(currentSubcategory);
      router.push(`/${gender}/${category.slug}/${currentSubcategory.slug}`);
      Cookies.set('subcategory', JSON.stringify(currentSubcategory));
      setBrands([]);
    }
  };

  if (loading) return <>Cargando....</>;
  // if (isError) return <>no data</>;

  return (
    <>
      <div className="divide-y divide-gray-300">
        {subcategories.map((sub: ISubcategory) => {
          return (
            <li
              key={sub.id}
              className="pl-1 pr-2 py-2"
              onClick={() => handleChange(sub)}
            >
              <label
                htmlFor={sub.slug}
                className="flex justify-between items-center cursor-pointer hover:text-darkPrimary capitalize"
              >
                <span>{sub.title}</span>
                {sub.id == subcategory.id ? (
                  <RadiaSelectIcon color="var(--primary)" size="16" />
                ) : null}
              </label>
            </li>
          );
        })}
      </div>
    </>
  );
};
