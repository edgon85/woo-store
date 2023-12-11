import { MeasurementFilterItems } from './measurements/MeasurementFilterItems';
import { BrandsItems } from './brands/BrandsItems';
import { ClothesStateFilter } from './clothesState/ClothesStateFilter';
import { ColorFilter } from './colors/ColorFilter';
import { PriceFilter } from './price/PriceFilter';
import { MenuItem } from './NavItems';
import { fetchData } from '@/lib';
import {
  IBrand,
  IClothesState,
  IColor,
  IMeasurement,
  ISubcategory,
} from '@/interfaces';
import { SubcategoriesItems } from './CategoriesItem';

type Props = {
  gender: string;
  category: string;
  clothesType: string;
  isMovil?: boolean;
};
export const NavCategories = async ({
  gender,
  category,
  clothesType,
  isMovil,
}: Props) => {
  const subcategories = (await fetchData(
    `/subcategories/${gender}/${category}`
  )) as ISubcategory[];

  const measurements = (await fetchData(
    `/measurements?gender=${gender}&type=${clothesType}`
  )) as IMeasurement[];

  const brands = (await fetchData(`/brands/all?limit=15`)) as IBrand[];

  const clothesStates = (await fetchData(`/clothes-state`)) as IClothesState[];
  const colors = (await fetchData(`/colors`)) as IColor[];

  return (
    <div className="p-4">
      <ul className="space-y-2">
        <MenuItem
          title={'Subcategorías'}
          items={
            <SubcategoriesItems
              subcategories={subcategories}
              isMovil={isMovil}
            />
          }
        />
        <MenuItem
          title={'Marcas'}
          items={
            <div className="max-h-64 overflow-scroll">
              <BrandsItems brands={brands} isMovil={isMovil} />
            </div>
          }
        />
        <MenuItem
          title={'Tallas'}
          items={
            <div className="max-h-64 overflow-scroll">
              <MeasurementFilterItems measurements={measurements} />
            </div>
          }
        />
        <MenuItem
          title={'Estado'}
          items={
            <div className="max-h-64 overflow-scroll">
              <ClothesStateFilter
                clothesStates={clothesStates}
                isMovil={isMovil}
              />
            </div>
          }
        />
        <MenuItem
          title={'Color'}
          items={
            <div className="max-h-64 overflow-scroll">
              <ColorFilter colors={colors} isMovil={isMovil} />
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
