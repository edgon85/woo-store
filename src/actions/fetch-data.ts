'use server';

export async function fetchData(path: string) {
  const url = `${process.env.API_BASE_URL}${path}`;

  try {
    const resp = await fetch(url);

    if (!resp.ok) {
      const errorData = await resp.json(); // Obtener el mensaje de error como JSON
      throw new Error(errorData.message || 'Error al hacer fetch data');
    }

    return await resp.json();
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: error.message };
  }
}
