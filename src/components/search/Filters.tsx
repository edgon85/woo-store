'use client';

import { MenuItem } from '../ui/filters/NavItems';
import { ClothingTypeSearch } from './items/ClothingState';
import {
  ClothesStateFilter,
  BrandsItems,
  ColorFilter,
  MeasurementFilterItems,
  PriceFilter,
} from '../ui';
import { useParams } from 'next/navigation';
import { FilterDataProvider, useFilterData } from '../ui/filters/ContextData';

type Props = {
  isMobile?: boolean;
};

const FilterSkeleton = () => {
  return (
    <div className="space-y-2 p-4 animate-pulse">
      {[...Array(7)].map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-gray-200 p-3 rounded"
        >
          <div className="h-5 bg-gray-300 rounded w-24"></div>
          <div className="h-5 w-5 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
};

const FilterContent = ({ isMobile }: Props) => {
  const params = useParams();
  const { gender, clothing_type, category, subcategory } = params;
  const { filterData, isLoading, error } = useFilterData();

  const initialPath = [category, subcategory].filter(Boolean).join('/');

  if (isLoading) return <FilterSkeleton />;
  if (error) return null;

  return (
    <div className="p-4">
      <ul className="space-y-2">
        <MenuItem
          title={'Tipo de prenda'}
          items={
            <div className="max-h-64 overflow-scroll">
              <ClothingTypeSearch isMobile={isMobile} isSearch={true} />
            </div>
          }
        />

        <MenuItem
          title={'Marcas'}
          items={
            <div className="max-h-64 overflow-scroll">
              <BrandsItems
                isMobile={isMobile}
                isSearch={true}
                brands={filterData.brands}
              />
            </div>
          }
        />

       {/*  <MenuItem
          title={'Talla'}
          items={
            <div className="max-h-64 overflow-scroll">
              <MeasurementFilterItems
                isMobile={isMobile}
                isSearch={true}
                measurements={filterData.measurements}
              />
            </div>
          }
        /> */}

       {/*  <MenuItem
          title={'Estado'}
          items={
            <div className="max-h-64 overflow-scroll">
              <ClothesStateFilter
                isMobile={isMobile}
                clothesStates={filterData.clothesStates}
              />
            </div>
          }
        /> */}

        <MenuItem
          title={'Color'}
          items={
            <div className="max-h-64 overflow-scroll">
              <ColorFilter
                isMobile={isMobile}
                isSearch={true}
                colors={filterData.colors}
              />
            </div>
          }
        />

        <MenuItem
          title={'Precio'}
          items={
            <div className="">
              <PriceFilter isMobile={isMobile} isSearch={true} />
            </div>
          }
        />
      </ul>
    </div>
  );
};
/* NavFilters */
export const NavFilters: React.FC<Props> = (props) => (
  <FilterDataProvider>
    <div className="p-4">
      <FilterContent {...props} />
    </div>
  </FilterDataProvider>
);
