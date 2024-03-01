import { unstable_noStore as noStore } from 'next/cache';

export async function getRelatedProducts(productSlug: string) {
  noStore();
  // const token = cookies().get('token')?.value;

  /* if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;
  
    let url = `${process.env.API_BASE_URL}${path}&take=${take}&skip=${
      (page - 1) * take
    }`; */

  const url = `${process.env.API_BASE_URL}/products/related/${productSlug}`;

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
