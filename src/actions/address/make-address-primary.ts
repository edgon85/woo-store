'use server';

import { getAuthToken } from '@/libs';

export async function makeAddressPrimary(addressId: string) {
  const url = `${process.env.API_BASE_URL}/shipping-address/${addressId}/primary`;

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
      body: JSON.stringify({ id: addressId }),
    });

    if (!resp.ok) {
      const errorData = await resp.json(); // Obtener el mensaje de error como JSON
      throw new Error(errorData.message || 'Error al hacer fetch data');
    }

    const data = await resp.text();

    return {
      ok: true,
      message: data,
    };
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: 'ocurrió un error vea los logs' };
  }
}
