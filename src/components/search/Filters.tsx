'use client';
import { useParams, useSearchParams } from 'next/navigation';
import { MenuItem } from '../ui/filters/NavItems';
import { BrandsItems } from '../ui/filters/brands/BrandsItems';
import { MeasurementFilterItems } from '../ui/filters/measurements/MeasurementFilterItems';
import { ClothesStateFilter } from '../ui/filters/clothesState/ClothesStateFilter';
import { ColorFilter } from '../ui/filters/colors/ColorFilter';
import { PriceFilter } from '../ui/filters/price/PriceFilter';
import { ClothingStateItem } from './items/ClothingState';
import { useFilterStore } from '@/stores';
import { Filter } from '@/interfaces';
import { useCallback, useEffect } from 'react';

type Props = {
  isMovil?: boolean;
};

export const NavFilters = ({ isMovil }: Props) => {
  const params = useParams();
  const searchParams = useSearchParams();
  const term = searchParams.get('q') || '';
  const { gender, clothing_type, category, subcategory } = params;
  const setFilters = useFilterStore((state) => state.setFilters);
  const filters = useFilterStore((state) => state.filters);

  console.log(term);

  return (
    <div className="p-4">
      <ul className="space-y-2">
        <MenuItem
          title={'Marcas'}
          items={
            <div className="max-h-64 overflow-scroll">
              <BrandsItems isMobile={isMovil} />
            </div>
          }
        />

        {/*  {clothing_type && (
          <MenuItem
            title={'Tallas'}
            items={
              <div className="max-h-64 overflow-scroll">
                <MeasurementFilterItems
                  gender={gender.toString()}
                  clothing_type={clothing_type.toString()}
                  isMovil={isMovil}
                />
              </div>
            }
          />
        )} */}

        <MenuItem
          title={'Estado'}
          items={
            <div className="max-h-64 overflow-scroll">
              <ClothingStateItem />
            </div>
          }
        />

        <MenuItem
          title={'Color'}
          items={
            <div className="max-h-64 overflow-scroll">
              <ColorFilter isMovil={isMovil} />
            </div>
          }
        />

        <MenuItem
          title={'Precio'}
          items={
            <div className="">
              <PriceFilter isMovil={isMovil} />
            </div>
          }
        />
      </ul>
    </div>
  );
};
