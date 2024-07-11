import {
  fetchPackageDeliveries,
  getBrands,
  getClothingCondition,
  getColors,
} from '@/actions';
import { EditProduct } from '@/components';
import { getProductBySlug } from '@/actions';
import { IPackageDelivery, IProduct } from '@/interfaces';
import { getAuthInfo } from '@/libs';

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id: productId } = params;

  const userInfo = await getAuthInfo();
  const { id: currentUserId } = userInfo!;

  const [
    productResult,
    packageDeliveriesDataResult,
    brandsData,
    clothingConditionData,
    colorsData,
  ] = await Promise.all([
    getProductBySlug(productId),
    fetchPackageDeliveries(),
    getBrands(''),
    getClothingCondition(),
    getColors(),
  ]);

  const product = productResult as IProduct;
  const packageDeliveriesData =
    packageDeliveriesDataResult as IPackageDelivery[];

  if (currentUserId !== product.user?.id)
    return (
      <>
        <p>No pude actualizar este producto</p>
      </>
    );

  return (
    <div className="main-wrapper flex justify-center pt-8 pb-8">
      <EditProduct
        product={product}
        packageDeliveriesData={packageDeliveriesData}
        brands={brandsData}
        clothingConditionList={clothingConditionData}
        colors={colorsData}
      />
    </div>
  );
}
// export default async function CategoriesPage
