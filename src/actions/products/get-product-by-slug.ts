'use server';
import { IProduct } from '@/interfaces';
import { getAuthToken } from '@/libs';
import { unstable_noStore as noStore } from 'next/cache';

type ErrorResult = {
  ok: false;
  message: string;
};

export async function getProductBySlug(productSlug: string) {
  noStore();
  const authToken = await getAuthToken();

  const url = `${process.env.API_BASE_URL}/products/${productSlug}`;

  try {
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!resp.ok) {
      const errorData = await resp.json(); // Obtener el mensaje de error como JSON
      throw new Error(errorData.message || 'Error al hacer fetch data');
    }

    const data: IProduct = await resp.json();

    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: error.message };
  }
}
