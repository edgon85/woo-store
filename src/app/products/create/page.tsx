import { getBrands, getClothingCondition, getColors } from '@/actions';
import { CreateProduct } from '@/components';

export default async function CreateProductPage() {
  const [brandsData, clothingConditionData, colorsData] = await Promise.all([
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
      />
    </div>
  );
}
