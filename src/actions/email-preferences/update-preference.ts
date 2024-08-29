'use server';
import { IEmailPreference } from '@/interfaces';
import { getAuthToken } from '@/libs';
import { unstable_noStore as noStore } from 'next/cache';

export const updateEmailPreferences = async (data: IEmailPreference) => {
  noStore();
  const url = `${process.env.API_BASE_URL}/email/update-preferences`;
  const authToken = await getAuthToken();

  if (!authToken) {
    return { ok: false, message: 'No se encontró un token de autenticación' };
  }
  try {
    const resp = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ ...data }),
    });

    if (!resp.ok) {
      const errorData = await resp.json(); // Obtener el mensaje de error como JSON
      throw new Error(errorData.message || 'Error al hacer fetch data');
    }

    const response = await resp.json();

    return {
      ok: true,
      data: response,
    };
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: 'ocurrió un error vea los logs' };
  }
};
