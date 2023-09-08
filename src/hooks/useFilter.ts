import { FilterContext } from '@/context';
import { useContext } from 'react';

export const useFilter = () => {
  const {
    gender,
    clothesType,
    category,
    subcategory,
    brands,
    isCategorySelected,
    isBrandSelected,

    setGender,
    setClothesType,
    setCategory,
    setSubcategory,
    setBrands,
    onCategorySelected,
    onBrandSelected,
  } = useContext(FilterContext);

  return {
    gender,
    clothesType,
    category,
    subcategory,
    brands,
    isCategorySelected,
    isBrandSelected,

    /* Methods */
    setGender,
    setClothesType,
    setCategory,
    setSubcategory,
    setBrands,
    onCategorySelected,
    onBrandSelected,
  };
};
