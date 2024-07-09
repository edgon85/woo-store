'use server';
import { cookies } from 'next/headers';
import { unstable_noStore as noStore } from 'next/cache';

export const fetchShippingAddress = async () => {
  noStore();
  const url = `${process.env.API_BASE_URL}/shipping-address`;
  const token = cookies().get('token')?.value;
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

    return data;
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: error.message };
  }
};
