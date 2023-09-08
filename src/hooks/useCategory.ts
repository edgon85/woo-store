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
    isBrandSelected,

    setClothesType,
    setCategory,
    setSubcategory,
    onCategorySelected,
    onBrandSelected,
  } = useContext(CategoryContext);

  return {
    gender,
    clothesType,
    category,
    subcategory,
    isCategorySelected,
    isBrandSelected,

    /* Methods */
    setGender,
    setClothesType,
    setCategory,
    setSubcategory,
    onCategorySelected,
    onBrandSelected,
  };
};
