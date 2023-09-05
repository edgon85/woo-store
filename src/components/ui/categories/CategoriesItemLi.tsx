import { useFetchSubcategoryByCategoryId } from '@/helpers';
import { RadiaSelectIcon } from '../icons';
import { useCategory } from '@/hooks';
import { ISubcategory } from '@/interfaces';

import styles from './Categories.module.css';
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';

export const CategoriesItemLi = () => {
  const { categoryId, subcategoryId, setSubcategoryId } = useCategory();

  const { subcategories, loading, isError } =
    useFetchSubcategoryByCategoryId(categoryId);

  const handleChange = (id: string, isChecked: boolean) => {
    if (id === subcategoryId) {
      setSubcategoryId('');
    } else {
      setSubcategoryId(id);
    }
  };

  if (loading) return <>Cargando....</>;
  // if (isError) return <>no data</>;

  return (
    <>
      {subcategories.map((sub: ISubcategory) => {
        return (
          <div key={sub.id}>
            <input
              type="checkbox"
              id={sub.id}
              className="flex"
              onChange={(e) => handleChange(sub.id, e.target.checked)}
            />
            <li
              //htmlFor={sub.id}
              //   onClick={() => setSubcategoryId(sub.id)}
              // className={`flex justify-between items-center text-black  py-2 cursor-pointer capitalize`}
              className={`flex justify-between items-center 
              ${sub.id == subcategoryId ? 'text-darkPrimary' : 'text-black'}
              py-2 cursor-pointer hover:text-darkPrimary capitalize`}
            >
              <label className={styles.label} htmlFor={sub.id}>
                <span>{sub.title}</span>
              </label>
              {sub.id == subcategoryId ? (
                <RadiaSelectIcon color="var(--primary)" size='16'/>
              ) : (
                null
              )}
            </li>
          </div>
        );
      })}
    </>
  );
};
