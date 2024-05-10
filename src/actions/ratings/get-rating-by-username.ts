'use server';

import { unstable_noStore as noStore } from 'next/cache';

export const getRatingByUsername = async (username: string) => {
  noStore();

  try {
    const url = `${process.env.API_BASE_URL}/ratings/my-ratings/${username}`;
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

    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: error.message };
  }
};
