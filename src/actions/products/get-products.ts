'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { getAuthToken } from '@/libs';

export async function getProductByUserIdOrUsername(userId: string) {
  noStore();
  const authToken = await getAuthToken();

  try {
    const url = `${process.env.API_BASE_URL}/products/u/${userId}`;
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

    const data = await resp.json();

    return data;
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: 'ocurrió un error vea los logs' };
  }
}
