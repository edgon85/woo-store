import { createContext } from 'react';

type ContextProps = {
  gender: string;
  clothesType: string;
  categoryId: string;
  subcategoryId: string;
  

  setGender: (gender: string) => void;
  setClothesType: (clothesType: string) => void;
  setCategoryId: (categoryId: string) => void;
  setSubcategoryId: (subcategoryId: string) => void;
};

export const CategoryContext = createContext<ContextProps>({} as ContextProps);
