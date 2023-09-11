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
  } = useContext(FilterContext);

  return {
    gender,
    clothesType,
    category,
    subcategory,
    brands,
    measurements,
    isCategorySelected,
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
    setFilters,
  };
};
