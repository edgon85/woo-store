'use server';

export async function getSubcategoriesMenu(
  gender: string,
  clothingType: string
) {
  const url = `${process.env.API_BASE_URL}/subcategories/menu/${gender}/${clothingType}`;

  try {
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
    return { ok: false, message: error.message };
  }
}
