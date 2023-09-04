import { createContext } from 'react';

type ContextProps = {
  gender: string;
  clothesType: string;

  setGender: (gender: string) => void;
  setClothesType: (clothesType: string) => void;
};

export const CategoryContext = createContext<ContextProps>({} as ContextProps);
