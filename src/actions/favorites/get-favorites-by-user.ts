'use server';
import { unstable_noStore as noStore } from 'next/cache';

type PaginationOptions = {
  page?: number;
  pageSize?: number;
  username: string;
};

export async function getFavoritesByUser({
  username,
  page = 1,
  pageSize = 20,
}: PaginationOptions) {
  noStore();
  const skip = (page - 1) * pageSize;

  const url = new URL(`${process.env.API_BASE_URL}/favorites/u/${username}`);
  url.searchParams.append('take', pageSize.toString());
  url.searchParams.append('skip', skip.toString());

  try {
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
