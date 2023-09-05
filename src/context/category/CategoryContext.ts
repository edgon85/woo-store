import { ICategory, ISubcategory } from '@/interfaces';
import { createContext } from 'react';

type ContextProps = {
  gender: string;
  clothesType: string;
  category: ICategory;
  subcategory: ISubcategory;
  isCategorySelected: boolean

  setGender: (gender: string) => void;
  setClothesType: (clothesType: string) => void;
  setCategory: (category: ICategory) => void;
  setSubcategory: (subcategory: ISubcategory) => void;
  onCategorySelected: () => void
};

export const CategoryContext = createContext<ContextProps>({} as ContextProps);
