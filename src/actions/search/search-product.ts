'use server';

import { unstable_noStore as noStore } from 'next/cache';

type PaginationOptions = {
  page?: number;
  take?: number;
  query?: string;
  gender?: string;
  clothesType?: string;
};

export const searchProduct = async ({
  page = 1,
  take = 10,
  query = '',
  gender,
  clothesType,
}: PaginationOptions) => {
  noStore();

  try {
    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    let url = `${
      process.env.API_BASE_URL
    }/products/find?gender=${gender}&clothesType=${clothesType}&search=${query}&take=${take}&skip=${
      (page - 1) * take
    }`;

    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //   Authorization: `Bearer ${token}`,
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
