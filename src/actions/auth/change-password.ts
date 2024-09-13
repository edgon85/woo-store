'use server';
import { getAuthToken } from '@/libs';

export async function changePassword(
  currentPassword: string,
  newPassword: string
) {
  const authToken = await getAuthToken();

  if (!authToken) {
    return { ok: false, message: 'No se encontró un token de autenticación' };
  }

  const url = `${process.env.API_BASE_URL}/auth/change-password`;

  try {
    const authResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });

    if (!authResponse.ok) {
      const errorData = await authResponse.json(); // Obtener el mensaje de error como JSON
      throw new Error(errorData.message || 'Error al hacer fetch data');
    }

    const data = await authResponse.text();

    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: error.message,
    };
  }
}
