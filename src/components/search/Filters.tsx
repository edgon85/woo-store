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

type Props = {
  isMobile?: boolean;
};

export const NavFilters = ({ isMobile }: Props) => {
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
              <BrandsItems isMobile={isMobile} isSearch={true} />
            </div>
          }
        />

        <MenuItem
          title={'Talla'}
          items={
            <div className="max-h-64 overflow-scroll">
              <MeasurementFilterItems isMobile={isMobile} isSearch={true} />
            </div>
          }
        />

        <MenuItem
          title={'Estado'}
          items={
            <div className="max-h-64 overflow-scroll">
              <ClothesStateFilter isMobile={isMobile} />
            </div>
          }
        />

        <MenuItem
          title={'Color'}
          items={
            <div className="max-h-64 overflow-scroll">
              <ColorFilter isMobile={isMobile} isSearch={true} />
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
