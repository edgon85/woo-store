'use server';
import { unstable_noStore as noStore } from 'next/cache';
import { getAuthToken } from '@/libs';

type PaginationOptions = {
  page?: number;
  pageSize?: number;
  query?: string;
};
export async function getFeaturedProducts({
  page = 1,
  pageSize = 40,
  query = '',
}: PaginationOptions) {
  noStore();
  const token = await getAuthToken();

  const skip = (page - 1) * pageSize;

  const url = new URL(`${process.env.API_BASE_URL}/products/featured`);
  url.searchParams.append('take', pageSize.toString());
  url.searchParams.append('skip', skip.toString());

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

    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: 'ocurrió un error vea los logs' };
  }
}
