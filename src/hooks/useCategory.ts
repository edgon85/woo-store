import { CategoryContext } from '@/context';
import { useContext } from 'react';

export const useCategory = () => {
  const {
    gender,
    clothesType,
    setGender,
    categoryId,
    subcategoryId,

    setClothesType,
    setCategoryId,
    setSubcategoryId,
  } = useContext(CategoryContext);

  return {
    gender,
    clothesType,
    categoryId,
    subcategoryId,

    /* Methods */
    setGender,
    setClothesType,
    setCategoryId,
    setSubcategoryId,
  };
};
