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
      const errorData = await resp.json(); // Obtener el mensaje de error como JSON
      throw new Error(errorData.message || 'Error al hacer fetch data');
    }

    const response = await resp.text();
    // console.log(data);
    revalidatePath(`/product/edit/${productId}`);
    return {
      ok: true,
      data: {
        message: response,
      },
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      ok: false,
      message: error.message,
    };
  }
}
