'use server';

import { IColor } from '@/interfaces';

export async function getColors(): Promise<IColor[]> {
  try {
    const url = `${process.env.API_BASE_URL}/colors`;

    const resp = await fetch(url, {
      method: 'GET',
    });

    if (!resp.ok) {
      throw new Error('Failed to fetch data');
    }

    const data: IColor[] = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener los colores');
  }
}
