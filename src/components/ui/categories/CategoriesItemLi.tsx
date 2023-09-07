import Cookies from 'js-cookie';

// import { useFetchSubcategoryByCategoryId, useFetchSubcategoryByCategoryIdPrueba } from '@/helpers';
import { RadiaSelectIcon } from '../icons';
import { useCategory, useFetcher } from '@/hooks';
import { ISubcategory } from '@/interfaces';

import styles from './Categories.module.css';
import { useRouter } from 'next/navigation';

export const CategoriesItemLi = () => {
  const { gender, category, subcategory, setSubcategory } = useCategory();
  const router = useRouter();

  /*  const { subcategories, loading, isError } = useFetchSubcategoryByCategoryIdPrueba(
    category.id
  ); */

  const { data: subcategories, isLoading: loading } = useFetcher(
    `/subcategories?category=${category.id}`
  );

  const handleChange = (currentSubcategory: ISubcategory) => {
    if (currentSubcategory.id === subcategory.id) {
      setSubcategory({ id: '', title: '', slug: '' });
      router.push(`/${gender}/${category.slug}`);
      Cookies.remove('subcategory');
    } else {
      setSubcategory(currentSubcategory);
      router.push(`/${gender}/${category.slug}/${currentSubcategory.slug}`);
      Cookies.set('subcategory', JSON.stringify(currentSubcategory));
    }
  };

  if (loading) return <>Cargando....</>;
  // if (isError) return <>no data</>;

  return (
    <>
      {subcategories.map((sub: ISubcategory) => {
        return (
          <div key={sub.id}>
            <input type="checkbox" id={sub.id} className="flex" />
            <li
              onClick={() => handleChange(sub)}
              className={`flex justify-between items-center 
              ${sub.id == subcategory.id ? 'text-darkPrimary' : 'text-black'}
              py-2 cursor-pointer hover:text-darkPrimary capitalize`}
            >
              <label className={styles.label} htmlFor={sub.id}>
                <span>{sub.title}</span>
              </label>
              {sub.id == subcategory.id ? (
                <RadiaSelectIcon color="var(--primary)" size="16" />
              ) : null}
            </li>
          </div>
        );
      })}
    </>
  );
};
