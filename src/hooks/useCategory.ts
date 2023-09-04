import { CategoryContext } from '@/context';
import { useContext } from 'react';

export const useCategory = () => {
  const { gender, clothesType, setGender, setClothesType } =
    useContext(CategoryContext);

  return {
    gender,
    clothesType,

    /* Methods */
    setGender,
    setClothesType,
  };
};
