// FilterDataContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getClothingCondition, getColors, getFilteredBrands } from '@/actions';
import { getMeasurements } from '@/actions/measurements';
import { getSubcategoriesMenu } from '@/actions/categories/get-subcategory';
import useSWR from 'swr';

type FilterData = {
  brands: any[];
  measurements: any[];
  clothesStates: any[];
  colors: any[];
  menuItems: any[];
};

type FilterContextType = {
  filterData: FilterData;
  isLoading: boolean;
  error: string | null;
};

const FilterDataContext = createContext<FilterContextType | undefined>(
  undefined
);

export const useFilterData = () => {
  const context = useContext(FilterDataContext);
  if (context === undefined) {
    throw new Error('useFilterData must be used within a FilterDataProvider');
  }
  return context;
};

export const FilterDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const params = useParams();
  const { gender, clothing_type } = params;

  /* useEffect(() => {
    const fetchFilterData = async () => {
      setIsLoading(true);
      try {
        const [brands, measurements, clothesStates, colors, menuItems] =
          await Promise.all([
            getFilteredBrands(),
            clothing_type &&
              getMeasurements(gender.toString(), clothing_type.toString()),
            getClothingCondition(),
            getColors(),
            clothing_type &&
              getSubcategoriesMenu(gender.toString(), clothing_type.toString()),
          ]);

        setFilterData({
          brands,
          measurements,
          clothesStates,
          colors,
          menuItems,
        });
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setError('Failed to fetch filter data');
        setIsLoading(false);
      }
    };

    fetchFilterData();
  }, [gender, clothing_type]); */
  const fetcher = async () => {
    const [brands, measurements, clothesStates, colors, menuItems] =
      await Promise.all([
        getFilteredBrands(),
        clothing_type &&
          getMeasurements(gender.toString(), clothing_type.toString()),
        getClothingCondition(),
        getColors(),
        clothing_type &&
          getSubcategoriesMenu(gender.toString(), clothing_type.toString()),
      ]);
    return { brands, measurements, clothesStates, colors, menuItems };
  };

  const { data, error } = useSWR(
    ['/api/filter-data', gender, clothing_type],
    fetcher,
    { revalidateOnFocus: false }
  );

  const value = {
    filterData: data || {
      brands: [],
      measurements: [],
      clothesStates: [],
      colors: [],
      menuItems: [],
    },
    isLoading: !error && !data,
    error: error ? 'Failed to fetch filter data' : null,
  };
  return (
    <FilterDataContext.Provider value={value}>
      {children}
    </FilterDataContext.Provider>
  );
};
