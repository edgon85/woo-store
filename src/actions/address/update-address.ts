'use server';
import { IAddress } from '@/interfaces';
import { getAuthToken } from '@/libs';
import { revalidatePath } from 'next/cache';

export async function updateAddress(id: string, addressData: IAddress) {
  const url = `${process.env.API_BASE_URL}/shipping-address/${id}`;

  const authToken = await getAuthToken();

  if (!authToken) {
    return { ok: false, message: 'No se encontró un token de autenticación' };
  }

  try {
    const resp = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ ...addressData }),
    });

    if (!resp.ok) {
      const errorData = await resp.json(); // Obtener el mensaje de error como JSON
      throw new Error(errorData.message || 'Error al hacer fetch data');
    }

    const data = await resp.json();

    revalidatePath(`/settings/transactions/purchases`);

    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: 'ocurrió un error vea los logs' };
  }
}
