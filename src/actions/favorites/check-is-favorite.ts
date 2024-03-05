'use server';
import { unstable_noStore as noStore } from 'next/cache';

export async function getCheckIsFavorite(productSlug: string, token: string) {
  noStore();

  const url = `${process.env.API_BASE_URL}/favorites/${productSlug}`;

  try {
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!resp.ok) {
      const errorData = await resp.json(); // Obtener el mensaje de error como JSON
      throw new Error(errorData.message || 'Error al hacer fetch data');
    }

    const data = await resp.json();
    console.log(data);

    return data;
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: 'ocurrió un error vea los logs' };
  }
}
