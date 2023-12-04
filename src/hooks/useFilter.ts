import { FilterContext } from '@/context';
import { useContext } from 'react';

export const useFilter = () => {
  const {
    gender,
    clothesType,
    category,
    subcategory,
    brands,
    measurements,
    filters,

    setGender,
    setClothesType,
    setCategory,
    setSubcategory,
    setBrands,
    setMeasurements,
    setFilters,
  } = useContext(FilterContext);

  return {
    gender,
    clothesType,
    category,
    subcategory,
    brands,
    measurements,
    filters,

    /* Methods */
    setGender,
    setClothesType,
    setCategory,
    setSubcategory,
    setBrands,
    setMeasurements,
    setFilters,
  };
};
