import { FC, useEffect, useReducer } from 'react';
import { FilterContext, FilterReducer } from './';
import { ICategory, ISubcategory } from '@/interfaces';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';

export interface FilterState {
  gender: string;
  clothesType: string;
  category: ICategory;
  subcategory: ISubcategory;
  brands: string[];
  isCategorySelected: boolean;
  isBrandSelected: boolean;
}

const CATEGORY_INITIAL_STATE: FilterState = {
  gender: 'mujer',
  clothesType: 'ropa',
  category: {
    id: '59f36816-035b-44cb-bc32-30dd85a7cc14',
    title: '',
    slug: 'vestidos',
  },
  subcategory: { id: '', title: '', slug: '' },
  isCategorySelected: false,
  isBrandSelected: false,
  brands: [],
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const FilterProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(FilterReducer, CATEGORY_INITIAL_STATE);
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
    dispatch({ type: '[Filter] - category', payload: cat });
    dispatch({ type: '[Filter] - category selected' });
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
    dispatch({ type: '[Filter] - subcategory', payload: subCat });
  }, [path]);

  const setGender = (gender: string) =>
    dispatch({ type: '[Filter] - gender', payload: gender });

  const setClothesType = (clothesType: string) =>
    dispatch({ type: '[Filter] - clothes type', payload: clothesType });

  const setCategory = (category: ICategory) =>
    dispatch({ type: '[Filter] - category', payload: category });

  const setSubcategory = (subcategory: ISubcategory) =>
    dispatch({ type: '[Filter] - subcategory', payload: subcategory });

  const onCategorySelected = () =>
    dispatch({ type: '[Filter] - category selected' });

  const onBrandSelected = () => dispatch({ type: '[Filter] - Brand selected' });

  const setBrands = (brands: string[]) => {
    dispatch({ type: '[Filter] - Brands', payload: brands });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,

        /* Methods */
        setGender,
        setClothesType,
        setCategory,
        setSubcategory,
        onCategorySelected,
        onBrandSelected,
        setBrands
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
