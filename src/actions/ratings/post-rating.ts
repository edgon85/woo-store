'use server';

import { RatingState } from '@/stores/rating.store';
import { cookies } from 'next/headers';

export async function createRatingUser(
  ratingData: RatingState,
  orderId: string
) {
  const token = cookies().get('token')?.value;
  const url = `${process.env.API_BASE_URL}/ratings/${orderId}`;

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...ratingData,
      }),
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
    return { ok: false, message: error.message };
  }
}
