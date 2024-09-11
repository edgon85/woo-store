import { getBrands, getClothingCondition, getColors } from '@/actions';
import { EditProduct } from '@/components';
import { getProductBySlug } from '@/actions';
import { IProduct } from '@/interfaces';
import { getAuthInfo } from '@/libs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar producto',
};

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id: productId } = params;

  const userInfo = await getAuthInfo();
  const { id: currentUserId } = userInfo!;

  const [productResult, brandsData, clothingConditionData, colorsData] =
    await Promise.all([
      getProductBySlug(productId),

      getBrands(''),
      getClothingCondition(),
      getColors(),
    ]);

  const { ok, data: product } = productResult;

  if (!ok) {
    return <p>No pude obtener el producto</p>;
  }

  if (currentUserId !== product?.user?.id)
    return (
      <>
        <p>No pude actualizar este producto</p>
      </>
    );

  return (
    <div className="main-wrapper flex justify-center pt-8 pb-8">
      <EditProduct
        product={product}
        brands={brandsData}
        clothingConditionList={clothingConditionData}
        colors={colorsData}
      />
    </div>
  );
}
// export default async function CategoriesPage
