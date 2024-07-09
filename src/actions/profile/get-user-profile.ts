'use server';
import { IUser } from '@/interfaces';
import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers';

export const fetchUserProfile = async (userId: string) => {
  noStore();
  const token = cookies().get('token')?.value;
  const url = `${process.env.API_BASE_URL}/profiles/user/${userId}`;

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

    const data: IUser = await resp.json();

    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: error.message };
  }
};
