import { wooApi } from '@/wooApi';

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

export const getSubcategories = async (gender: string, category: string) => {
  try {
    const { data } = await wooApi.get(
      `/subcategories?gender=${gender}&category=${category}`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
