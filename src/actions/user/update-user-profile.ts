'use server'
import { IProfile } from '@/interfaces';
import { cookies } from 'next/headers';

export async function updateProfile(
  profile: IProfile,
  image: boolean = false,
  urlImage?: string
) {
  const token = cookies().get('token')?.value;
  const { id, ...rest } = profile;
  const url = `${process.env.API_BASE_URL}/profiles/${id}`;

  try {
    const resp = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
