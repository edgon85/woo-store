'use server';

import { revalidatePath } from 'next/cache';
import { getAuthToken } from '@/libs';

export async function updateProduct(productId: string, dataToUpdate: any) {
  const authToken = await getAuthToken();

  if (!authToken) {
    return { ok: false, message: 'No se encontró un token de autenticación' };
  }
  const url = `${process.env.API_BASE_URL}/products/${productId}`;

  try {
    const resp = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        ...dataToUpdate,
      }),
    });

    if (!resp.ok) {
      console.log(resp);
      throw new Error('Failed to fetch data');
    }

    const data = await resp.json();
    // console.log(data);
    revalidatePath(`/product/edit/${productId}`);
    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'no se pudo actualizar, revisar los logs',
    };
  }
}
