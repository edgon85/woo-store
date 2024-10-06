import {
  fetchUserProfile,
  getBrands,
  getClothingCondition,
  getColors,
  getDepartmentsAvailable,
} from '@/actions';
import { CreateProduct } from '@/components';
import { getAuthInfo } from '@/libs';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Crear producto',
};

export default async function CreateProductPage() {
  const userInfo = await getAuthInfo();
  if (!userInfo) {
    redirect('/auth/login');
  }

  const [departments, brandsData, clothingConditionData, colorsData, profile] =
    await Promise.all([
      getDepartmentsAvailable(),
      getBrands(''),
      getClothingCondition(),
      getColors(),
      fetchUserProfile(userInfo.id),
    ]);

  return (
    <div className="main-wrapper flex justify-center pt-8 pb-8">
      <CreateProduct
        brands={brandsData}
        clothingConditionList={clothingConditionData}
        colors={colorsData}
        departments={departments.data.departments}
        userProfile={profile.data?.profile!}
      />
    </div>
  );
}
