'use server'
import { cookies } from 'next/headers';

type DataUser = {
  id: string;
  fullName?: string;
  username?: string;
  email?: string;
  password?: string;
};
export async function updateUserData(dataUser: DataUser) {
  const token = cookies().get('token')?.value;
  const { id, ...rest } = dataUser;
  const url = `${process.env.API_BASE_URL}/auth/update/${id}`;

  try {
    const resp = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...rest }),
    });

    if (!resp.ok) {
      const errorData = await resp.json();
      throw new Error(errorData.message || 'Error al hacer fetch data');
    }
    // Si la respuesta es exitosa, se procesa la respuesta JSON
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
