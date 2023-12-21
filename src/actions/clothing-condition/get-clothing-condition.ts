'use server';

import { IClothesState } from '@/interfaces';

export async function getClothingCondition(): Promise<IClothesState[]> {
  try {
    const url = `${process.env.API_BASE_URL}/clothes-state`;

    const resp = await fetch(url, {
      method: 'GET',
    });

    if (!resp.ok) {
      throw new Error('Failed to fetch data');
    }

    const data: IClothesState[] = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener estado de la prenda');
  }
}
