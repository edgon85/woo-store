import { CategoryContext } from '@/context';
import { useContext } from 'react';

export const useCategory = () => {
  const {
    gender,
    clothesType,
    setGender,
    category,
    subcategory,
    isCategorySelected,

    setClothesType,
    setCategory,
    setSubcategory,
    onCategorySelected,
  } = useContext(CategoryContext);

  return {
    gender,
    clothesType,
    category,
    subcategory,
    isCategorySelected,

    /* Methods */
    setGender,
    setClothesType,
    setCategory,
    setSubcategory,
    onCategorySelected,
  };
};
