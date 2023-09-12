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
    isMeasurementSelected,
    measurements,
    filters,
    isClothesStateSelected,

    setGender,
    setClothesType,
    setCategory,
    setSubcategory,
    setBrands,
    setMeasurements,
    setFilters,
    onCategorySelected,
    onBrandSelected,
    onMeasurementSelected,
    onClothesStateSelected
  } = useContext(FilterContext);

  return {
    gender,
    clothesType,
    category,
    subcategory,
    brands,
    measurements,
    isCategorySelected,
    isClothesStateSelected,
    isBrandSelected,
    isMeasurementSelected,
    filters,

    /* Methods */
    setGender,
    setClothesType,
    setCategory,
    setSubcategory,
    setBrands,
    setMeasurements,
    onCategorySelected,
    onBrandSelected,
    onMeasurementSelected,
    onClothesStateSelected,
    setFilters,
  };
};
