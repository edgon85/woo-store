'use server';

import { unstable_noStore as noStore } from 'next/cache';

type PaginationOptions = {
  page?: number;
  take?: number;
  path?: string;
  queryString?: string;
  subcategory?: string;
  gender?: string;
};
export async function getProductByGenderAndCategory({
  page = 1,
  take = 10,
  path,
}: PaginationOptions) {
  noStore();

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  let url = `${process.env.API_BASE_URL}${path}&take=${take}&skip=${
    (page - 1) * take
  }`;

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

export async function getProductBySubcategory({
  page = 1,
  take = 10,
  queryString = '',
  subcategory,
  gender,
}: PaginationOptions) {
  noStore();

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  let url = `${process.env.API_BASE_URL}`;

  if (queryString) {
    url += `/products/filter?gender=${gender}&subcategory=${subcategory}&${queryString}`;
  } else {
    url += `/products/subcategory/${subcategory}`;
  }
  const sign = queryString !== '' ? '&' : '?';
  url += `${sign}take=${take}&skip=${(page - 1) * take}`;
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
