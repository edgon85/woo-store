'use client';
import { MeasurementFilterItems } from './measurements/MeasurementFilterItems';
import { BrandsItems } from './brands/BrandsItems';
import { ClothesStateFilter } from './clothesState/ClothesStateFilter';
import { ColorFilter } from './colors/ColorFilter';
import { PriceFilter } from './price/PriceFilter';
import { MenuItem } from './NavItems';

import { useParams, usePathname } from 'next/navigation';
import { HierarchicalMenu } from './hierarchical-menu/HierarchicalMenu';
import { ClothingType } from './clothing-type/ClothingType';

type Props = {
  isMobile?: boolean;
};

export const NavCategories = ({ isMobile }: Props) => {
  const params = useParams();
  const { gender, clothing_type, category, subcategory } = params;
  // const pathname = usePathname();

  const initialPath = [category, subcategory].filter(Boolean).join('/');

  return (
    <div className="p-4">
      <ul className="space-y-2">
        {!category && !subcategory ? (
          <MenuItem
            title={'Tipo de prenda'}
            items={
              <div className="max-h-64 overflow-scroll">
                <ClothingType isMobile={isMobile} gender={gender.toString()} />
              </div>
            }
          />
        ) : null}

        {gender && clothing_type ? (
          <MenuItem
            title={`${category ? 'Subcategorías' : 'Categorías'} `}
            items={
              <div className="max-h-64 overflow-scroll">
                <HierarchicalMenu
                  gender={gender.toString()}
                  clothingType={clothing_type.toString()}
                  initialPath={initialPath}
                  isMobile={isMobile}
                />
              </div>
            }
          />
        ) : null}

        <MenuItem
          title={'Marcas'}
          items={
            <div className="max-h-64 overflow-scroll">
              <BrandsItems isMobile={isMobile} />
            </div>
          }
        />

        {clothing_type && (
          <MenuItem
            title={'Tallas'}
            items={
              <div className="max-h-64 overflow-scroll">
                <MeasurementFilterItems isMobile={isMobile} />
              </div>
            }
          />
        )}

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
              <ColorFilter isMobile={isMobile} />
            </div>
          }
        />

        <MenuItem
          title={'Precio'}
          items={
            <div className="">
              <PriceFilter isMobile={isMobile} />
            </div>
          }
        />
      </ul>
    </div>
  );
};
