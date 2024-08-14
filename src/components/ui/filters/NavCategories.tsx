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
  isMovil?: boolean;
};

export const NavCategories = ({ isMovil }: Props) => {
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
                <ClothingType isMobile={isMovil} gender={gender.toString()} />
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
                />
              </div>
            }
          />
        ) : null}

        <MenuItem
          title={'Marcas'}
          items={
            <div className="max-h-64 overflow-scroll">
              <BrandsItems isMobile={isMovil} />
            </div>
          }
        />

        {clothing_type && (
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
        )}

        <MenuItem
          title={'Estado'}
          items={
            <div className="max-h-64 overflow-scroll">
              <ClothesStateFilter isMovil={isMovil} />
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
