'use server';

type PaginationOptions = {
  page?: number;
  take?: number;
  query?: string;
};
export async function getFeaturedProducts({
  page = 1,
  take = 10,
  query = '',
}: PaginationOptions) {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  let url = `${process.env.API_BASE_URL}/products/featured?take=${take}&skip=${
    (page - 1) * take
  }`;

  // Agregar el parámetro de búsqueda si se proporciona un valor no vacío para query
  if (query.trim() !== '') {
    url += `&search=${encodeURIComponent(query)}`;
  }

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

    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: 'ocurrió un error vea los logs' };
  }
}
