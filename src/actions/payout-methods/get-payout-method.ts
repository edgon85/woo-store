'use server';
import { cookies } from 'next/headers';

export const getPayoutByUser = async (userId: string) => {
  const token = cookies().get('token')?.value;
  try {
    // payout-method/u/d985c61e-48e8-4701-bc37-468875bd533d
    const url = `${process.env.API_BASE_URL}/payout-method/u/${userId}`;

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
    return { ok: false, message: 'ocurrió un error vea los logs' };
  }
};
