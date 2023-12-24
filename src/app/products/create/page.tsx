import {
  fetchPackageDeliveries,
  getBrands,
  getClothingCondition,
  getColors,
} from '@/actions';
import { CreateProduct } from '@/components';
import { IPackageDelivery } from '@/lib';

export default async function CreateProductPage() {
  const [packageDeliveriesData, brandsData, clothingConditionData, colorsData] =
    await Promise.all([
      fetchPackageDeliveries(),
      getBrands(''),
      getClothingCondition(),
      getColors(),
    ]);
  /*  const packageDeliveriesData =
    (await fetchPackageDeliveries()) as IPackageDelivery[];

  const brandsData = await getBrands(''); */

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
