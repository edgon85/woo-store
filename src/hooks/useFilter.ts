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
    isColorSelected,
    isPriceSelected,

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
    onClothesStateSelected,
    onColorSelected,
    onPriceSelected,
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
    isColorSelected,
    isPriceSelected,

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
    onColorSelected,
    onPriceSelected,
  };
};
