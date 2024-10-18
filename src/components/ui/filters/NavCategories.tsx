'use client';
import { MeasurementFilterItems } from './measurements/MeasurementFilterItems';
import { BrandsItems } from './brands/BrandsItems';
import { ClothesStateFilter } from './clothesState/ClothesStateFilter';
import { ColorFilter } from './colors/ColorFilter';
import { PriceFilter } from './price/PriceFilter';
import { MenuItem } from './NavItems';

import { useParams } from 'next/navigation';
import { HierarchicalMenu } from './hierarchical-menu/HierarchicalMenu';
import { ClothingType } from './clothing-type/ClothingType';
import { FilterDataProvider, useFilterData } from './ContextData';

type Props = {
  isMobile?: boolean;
};

const FilterContent = ({ isMobile }: Props) => {
  const params = useParams();
  const { gender, clothing_type, category, subcategory } = params;
  const { filterData, isLoading, error } = useFilterData();

  const initialPath = [category, subcategory].filter(Boolean).join('/');

  if (isLoading) return <div>Loading filters...</div>;
  if (error) return <div>Error loading filters: {error}</div>;

  return (
    <ul className="space-y-2">
      {!category && !subcategory && (
        <MenuItem
          title={'Tipo de prenda'}
          items={
            <div className="max-h-64 overflow-scroll">
              <ClothingType isMobile={isMobile} gender={gender.toString()} />
            </div>
          }
        />
      )}

      {gender && clothing_type && (
        <MenuItem
          title={`${category ? 'Subcategorías' : 'Categorías'} `}
          items={
            <div className="max-h-64 overflow-scroll">
              <HierarchicalMenu
                gender={gender.toString()}
                clothingType={clothing_type.toString()}
                initialPath={initialPath}
                isMobile={isMobile}
                menuItems={filterData.menuItems}
              />
            </div>
          }
        />
      )}

      <MenuItem
        title={'Marcas'}
        items={
          <div className="max-h-64 overflow-scroll">
            <BrandsItems isMobile={isMobile} brands={filterData.brands} />
          </div>
        }
      />

      {clothing_type && (
        <MenuItem
          title={'Tallas'}
          items={
            <div className="max-h-64 overflow-scroll">
              <MeasurementFilterItems
                isMobile={isMobile}
                measurements={filterData.measurements}
              />
            </div>
          }
        />
      )}

      <MenuItem
        title={'Estado'}
        items={
          <div className="max-h-64 overflow-scroll">
            <ClothesStateFilter
              isMobile={isMobile}
              clothesStates={filterData.clothesStates}
            />
          </div>
        }
      />

      <MenuItem
        title={'Color'}
        items={
          <div className="max-h-64 overflow-scroll">
            <ColorFilter isMobile={isMobile} colors={filterData.colors} />
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
  );
};

export const NavCategories: React.FC<Props> = (props) => (
  <FilterDataProvider>
    <div className="p-4">
      <FilterContent {...props} />
    </div>
  </FilterDataProvider>
);
