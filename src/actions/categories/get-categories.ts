'use server';
import { cookies } from 'next/headers';
import { unstable_noStore as noStore } from 'next/cache';

/* type PaginationOptions = {
  page?: number;
  take?: number;
  path: string;
};
export async function getProductByGenderAndCategory({
  page = 1,
  take = 10,
  path,
}: PaginationOptions) {
  // noStore();
  const token = cookies().get('token')?.value;

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  let url = `${process.env.API_BASE_URL}${path}&take=${take}&skip=${
    (page - 1) * take
  }`;


  try {
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

    return data;
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: 'ocurrió un error vea los logs' };
  }
}
 */