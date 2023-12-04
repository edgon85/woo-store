import { useFilter } from '@/hooks';
import { MeasurementFilterItems } from './measurements/MeasurementFilterItems';
import { BrandsItems } from './brands/BrandsItems';
import { ClothesStateFilter } from './clothesState/ClothesStateFilter';
import { ColorFilter } from './colors/ColorFilter';
import { PriceFilter } from './price/PriceFilter';
import { MenuItem } from './NavItems';
import { fetchData } from '@/lib';
import { IMeasurement, ISubcategory } from '@/interfaces';
import { SubcategoriesItems } from './CategoriesItem';

type Props = {
  gender: string;
  category: string;
  clothesType: string;
};
export const NavCategories = async ({
  gender,
  category,
  clothesType,
}: Props) => {
  const subcategories = (await fetchData(
    `/subcategories/${gender}/${category}`
  )) as ISubcategory[];

  const measurements = (await fetchData(
    `/measurements?gender=${gender}&type=${clothesType}`
  )) as IMeasurement[];

  return (
    <div className="p-4">
      <ul className="space-y-2">
        <MenuItem
          title={'Subcategorías'}
          items={<SubcategoriesItems subcategories={subcategories} />}
        />
        {/*  <MenuItem
          title={'Marcas'}
          items={
            <div className="max-h-64 overflow-scroll">
              <BrandsItems />
            </div>
          }
        /> */}
        <MenuItem
          title={'Tallas'}
          items={
            <div className="max-h-64 overflow-scroll">
              <MeasurementFilterItems measurements={measurements} />
            </div>
          }
        />
        {/*  <MenuItem
          title={'Estado'}
          items={
            <div className="max-h-64 overflow-scroll">
              <ClothesStateFilter />
            </div>
          }
        />
        <MenuItem
          title={'Color'}
          items={
            <div className="max-h-64 overflow-scroll">
              <ColorFilter />
            </div>
          }
        />
        <MenuItem
          title={'Precio'}
          items={
            <div className="">
              <PriceFilter />
            </div>
          }
        /> */}
      </ul>
    </div>
  );
};
