'use server';

import { getAuthToken } from '@/libs';

export async function userState() {
  const url = `${process.env.API_BASE_URL}/auth/check-status`;
  const token = await getAuthToken();

  if (!token) {
    return { ok: false, message: 'No se encontró un token de autenticación' };
  }

  try {
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!resp.ok) {
      const errorData = await resp.json();
      throw new Error(errorData.message || 'Error al hacer fetch data');
    }
    // Si la respuesta es exitosa, se procesa la respuesta JSON
    const data = await resp.json();

    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: error.message };
  }
}
