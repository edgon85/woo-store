import { ICategory, ISubcategory } from '@/interfaces';
import { createContext } from 'react';

type ContextProps = {
  gender: string;
  clothesType: string;
  category: ICategory;
  subcategory: ISubcategory;
  isCategorySelected: boolean;
  isBrandSelected: boolean;
  brands: string[];

  setGender: (gender: string) => void;
  setClothesType: (clothesType: string) => void;
  setCategory: (category: ICategory) => void;
  setSubcategory: (subcategory: ISubcategory) => void;
  onCategorySelected: () => void;
  onBrandSelected: () => void;
  setBrands: (brands: string[]) => void;
};

export const FilterContext = createContext<ContextProps>({} as ContextProps);
