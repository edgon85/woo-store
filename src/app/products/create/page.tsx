import {
  fetchPackageDeliveries,
  getBrands,
  getClothingCondition,
  getColors,
} from '@/actions';
import { CreateProduct } from '@/components';

export default async function CreateProductPage() {
  const [packageDeliveriesData, brandsData, clothingConditionData, colorsData] =
    await Promise.all([
      fetchPackageDeliveries(),
      getBrands(''),
      getClothingCondition(),
      getColors(),
    ]);

  return (
    <div className="main-wrapper flex justify-center pt-8 pb-8">
      <CreateProduct
        packageDeliveriesData={packageDeliveriesData}
        brands={brandsData}
        clothingConditionList={clothingConditionData}
        colors={colorsData}
      />
    </div>
  );
}
