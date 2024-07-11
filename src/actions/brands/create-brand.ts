'use server';
import { getAuthToken } from '@/libs';

export async function createBrand(title: string) {
  const authToken = await getAuthToken();

  if (!authToken) {
    return { ok: false, message: 'No se encontró un token de autenticación' };
  }
  const url = `${process.env.API_BASE_URL}/brands`;

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        title,
      }),
    });

    if (!resp.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await resp.json();
    return {
      message: 'ok',
      data,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'no se pudo crear, revisar los logs',
    };
  }
}
