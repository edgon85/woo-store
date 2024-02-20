/* import { wooApi } from '@/wooApi';

export const getCategories = async (gender: string, type: string) => {
  try {
    // const { data } = await wooApi.get(`/categories/${gender}/${type}`);
    const { data } = await wooApi.get(
      `/categories?gender=${gender}&type=${type}`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getSubcategories = async (categoryId: string) => {
  try {
    const { data } = await wooApi.get(
      // `/subcategories?gender=${gender}&category=${category}`
      `/subcategories?category=${categoryId}`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
 */