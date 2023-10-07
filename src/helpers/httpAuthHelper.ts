import { wooApi } from '@/wooApi';
import { AxiosError } from 'axios';

export const userState = async (token: string): Promise<boolean> => {
  const url = `${process.env.API_BASE_URL}/auth/check-status`;

  try {
    const { data } = await wooApi.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return !!data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return false;
    }

    throw error;
  }
};

function isAxiosError(error: any): error is AxiosError {
  return (error as AxiosError).isAxiosError === true;
}
/*  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!resp.ok) {
    throw new Error('Failed to fetch data');
  }

  console.log(resp.json());
  return resp.json(); */

/* 
{
    "statusCode": 401,
    "message": "Unauthorized"
}
*/
