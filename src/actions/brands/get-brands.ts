'use server';

import { IBrand } from '@/interfaces';

export async function getBrands(filter: string): Promise<IBrand[]> {
  try {
    filter.toLowerCase();
    const url =
      filter !== ''
        ? `${process.env.API_BASE_URL}/brands?f=${filter}`
        : `${process.env.API_BASE_URL}/brands/all`;

    console.log({ url });
    const resp = await fetch(url, {
      method: 'GET',
    });

    if (!resp.ok) {
      throw new Error('Failed to fetch data');
    }

    const data: IBrand[] = await resp.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener marca');
  }
}

export async function getFilteredBrands() {
  try {
    const url = `${process.env.API_BASE_URL}/brands/all?take=15`;

    const resp = await fetch(url, {
      method: 'GET',
    });

    if (!resp.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener marca');
  }
}
