import {
  getBrands,
  getClothingCondition,
  getColors,
  getDepartmentsAvailable,
} from '@/actions';
import { CreateProduct } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crear producto',
};

export default async function CreateProductPage() {
  const [departments, brandsData, clothingConditionData, colorsData] =
    await Promise.all([
      getDepartmentsAvailable(),
      getBrands(''),
      getClothingCondition(),
      getColors(),
    ]);

  return (
    <div className="main-wrapper flex justify-center pt-8 pb-8">
      <CreateProduct
        brands={brandsData}
        clothingConditionList={clothingConditionData}
        colors={colorsData}
        departments={departments.data.departments}
      />
    </div>
  );
}
