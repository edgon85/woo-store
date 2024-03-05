'use server';
import { unstable_noStore as noStore } from 'next/cache';

type PaginationOptions = {
  page?: number;
  take?: number;
  username: string;
};

export const getFavoritesByUser = async ({
  username,
  page = 1,
  take = 10,
}: PaginationOptions) => {
  noStore();

  try {
    const url = `${
      process.env.API_BASE_URL
    }/favorites/u/${username}?take=${take}&skip=${(page - 1) * take}`;
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
};
