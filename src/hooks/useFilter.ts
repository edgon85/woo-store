import { FilterContext } from '@/context';
import { useContext } from 'react';

export const useFilter = () => {
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
  } = useContext(FilterContext);

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
