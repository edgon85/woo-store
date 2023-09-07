import { FC, useEffect, useReducer } from 'react';
import { CategoryContext, CategoryReducer } from './';
import { ICategory, ISubcategory } from '@/interfaces';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';

export interface CategoryState {
  gender: string;
  clothesType: string;
  category: ICategory;
  isCategorySelected: boolean;
  subcategory: ISubcategory;
}

const CATEGORY_INITIAL_STATE: CategoryState = {
  gender: 'mujer',
  clothesType: 'ropa',
  category: {
    id: '59f36816-035b-44cb-bc32-30dd85a7cc14',
    title: '',
    slug: 'vestidos',
  },
  subcategory: { id: '', title: '', slug: '' },
  isCategorySelected: false,
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const CategoryProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(CategoryReducer, CATEGORY_INITIAL_STATE);
  const path = usePathname();

  useEffect(() => {
    if (path === '/') {
      Cookies.remove('category');
      Cookies.remove('subcategory');
    }
  }, [path]);

  useEffect(() => {
    if (!Cookies.get('category')) return;

    const cat = JSON.parse(Cookies.get('category')!);
    dispatch({ type: '[Category] - category', payload: cat });
    dispatch({ type: '[Category] - category selected' });
  }, []);

  useEffect(() => {
    if (!Cookies.get('subcategory')) return;

    const segmentosDeRuta = path.split('/').filter(Boolean);
    const cantidadDeNiveles = segmentosDeRuta.length;

    if (cantidadDeNiveles === 2) {
      Cookies.remove('subcategory');
      return;
    }

    const subCat = JSON.parse(Cookies.get('subcategory')!);
    dispatch({ type: '[Category] - subcategory', payload: subCat });
  }, [path]);

  const setGender = (gender: string) =>
    dispatch({ type: '[Category] - gender', payload: gender });

  const setClothesType = (clothesType: string) =>
    dispatch({ type: '[Category] - clothes type', payload: clothesType });

  const setCategory = (category: ICategory) =>
    dispatch({ type: '[Category] - category', payload: category });

  const setSubcategory = (subcategory: ISubcategory) =>
    dispatch({ type: '[Category] - subcategory', payload: subcategory });

  const onCategorySelected = () =>
    dispatch({ type: '[Category] - category selected' });

  return (
    <CategoryContext.Provider
      value={{
        ...state,

        /* Methods */
        setGender,
        setClothesType,
        setCategory,
        setSubcategory,
        onCategorySelected,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
