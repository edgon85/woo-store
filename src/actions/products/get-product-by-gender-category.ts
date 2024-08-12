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

type PaginationOPtions1 = {
  gender: string;
  category: string;
  page: number;
  pageSize?: number;
};
export async function getProductByGenderAndCategory({
  gender,
  category,
  page = 1,
  pageSize = 10,
}: PaginationOPtions1) {
  noStore();

  const skip = (page - 1) * pageSize;
  const url = new URL(`${process.env.API_BASE_URL}/products`);

  url.searchParams.append('gender', gender);
  url.searchParams.append('category', category);
  url.searchParams.append('take', pageSize.toString());
  url.searchParams.append('skip', skip.toString());

  try {
    const resp = await fetch(url.toString(), {
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
