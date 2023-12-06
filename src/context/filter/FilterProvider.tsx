import { FC, useEffect, useReducer } from 'react';
import { FilterContext, FilterReducer } from './';
import { Filter, ICategory, ISubcategory } from '@/interfaces';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';

export interface FilterState {
  gender: string;
  clothesType: string;
  category: ICategory;
  subcategory: ISubcategory;
  brands: string[];
  measurements: string[];
  filters: Filter[];
}

const CATEGORY_INITIAL_STATE: FilterState = {
  gender: 'mujer',
  clothesType: 'ropa',
  category: {
    id: '',
    title: '',
    slug: '',
  },
  subcategory: { id: '', title: '', slug: '' },
  brands: [],
  measurements: [],
  filters: [],
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

  const setBrands = (brands: string[]) => {
    dispatch({ type: '[Filter] - Brands', payload: brands });
  };
  const setMeasurements = (measurements: string[]) => {
    dispatch({ type: '[Filter] - Measurement list', payload: measurements });
  };
  const setFilters = (filters: Filter[]) => {
    dispatch({ type: '[Filter] - Filter list', payload: filters });
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
        setBrands,

        setMeasurements,
        setFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
