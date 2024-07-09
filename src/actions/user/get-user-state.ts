'use server';

export async function userState(token: string) {
  const url = `${process.env.API_BASE_URL}/auth/check-status`;

  try {
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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
