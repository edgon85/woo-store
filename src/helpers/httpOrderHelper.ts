import { IOrder, TypeCreateOrder } from '@/lib';
import { wooApi } from '@/wooApi';

export const createOrder = async (order: TypeCreateOrder, token: string) => {
  try {
    const { data } = await wooApi.post(
      '/orders',
      { ...order },
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
