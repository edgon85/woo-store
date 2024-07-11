'use server';
import { IProfile } from '@/interfaces';
import { getAuthToken } from '@/libs';

export async function updateProfile(
  profile: IProfile,
  image: boolean = false,
  urlImage?: string
) {
  const authToken = await getAuthToken();

  if (!authToken) {
    return { ok: false, message: 'No se encontró un token de autenticación' };
  }
  const { id, ...rest } = profile;
  const url = `${process.env.API_BASE_URL}/profiles/${id}`;

  try {
    const resp = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(image ? { profileImage: urlImage } : { ...rest }),
    });

    if (!resp.ok) {
      const errorData = await resp.json();
      console.log(errorData);
      throw new Error(errorData.message || 'Error al hacer fetch data');
    }
    const data = await resp.json();
    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error.message || 'Error al hacer fetch data',
    };
  }
}
