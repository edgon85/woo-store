import {
  fetchPackageDeliveries,
  getBrands,
  getClothingCondition,
  getColors,
} from '@/actions';
import { CreateProduct } from '@/components';
import { IPackageDelivery } from '@/interfaces';

export default async function CreateProductPage() {
  const [
    packageDeliveriesDataRequest,
    brandsData,
    clothingConditionData,
    colorsData,
  ] = await Promise.all([
    fetchPackageDeliveries(),
    getBrands(''),
    getClothingCondition(),
    getColors(),
  ]);

  const packageDeliveriesData =
    packageDeliveriesDataRequest as IPackageDelivery[];

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
