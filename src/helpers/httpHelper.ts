import { IClotesSize } from '@/interfaces';
import { wooApi } from '@/wooApi';

export const getBrandData = async (filter: string) => {
  try {
    filter.toLowerCase();
    const url =
      filter !== ''
        ? `/brands/filter?fil=${filter}`
        : `/brands?offset=0&limit=30`;

    // console.log(url);
    const { data } = await wooApi.get(url);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createBrand = async (title: string, token: string) => {
  try {
    const { data } = await wooApi.post(
      '/brands',
      { title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      message: 'ok',
      data,
    };
  } catch (error: any) {
    return {
      message: error.response.data.message,
      data: null,
    };
  }
};

export const getMeasurementFilter = async (gender: string, type: string) => {
  try {
    const { data } = await wooApi.get(
      `/measurements?gender=${gender}&type=${type}`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
