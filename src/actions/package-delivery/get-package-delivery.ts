'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { IPackageDelivery } from '@/interfaces';
import { ErrorResult } from '@/types';
import { getAuthToken } from '@/libs';

export async function fetchPackageDelivery(
  ids: number[]
): Promise<IPackageDelivery[] | ErrorResult> {
  noStore();

  const authToken = await getAuthToken();

  if (!authToken) {
    return { ok: false, message: 'No se encontró un token de autenticación' };
  }
  const queryString = `?ids=${ids.join(',')}`;
  const url = `${process.env.API_BASE_URL}/package-delivery${queryString}`;
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

    const data: IPackageDelivery[] = await resp.json();

    return data;
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: error.message };
  }
}