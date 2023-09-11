import { Filter, ICategory, ISubcategory } from '@/interfaces';
import { createContext } from 'react';

type ContextProps = {
  gender: string;
  clothesType: string;
  category: ICategory;
  subcategory: ISubcategory;
  brands: string[];
  measurements: string[];
  filters: Filter[];
  isCategorySelected: boolean;
  isBrandSelected: boolean;
  isMeasurementSelected: boolean;

  setGender: (gender: string) => void;
  setClothesType: (clothesType: string) => void;
  setCategory: (category: ICategory) => void;
  setSubcategory: (subcategory: ISubcategory) => void;
  onCategorySelected: () => void;
  onBrandSelected: () => void;
  onMeasurementSelected: () => void;
  setBrands: (brands: string[]) => void;
  setMeasurements: (brands: string[]) => void;
  setFilters: (filters: Filter[]) => void;
};

export const FilterContext = createContext<ContextProps>({} as ContextProps);
