export async function createMessageContact(dataContact: any) {
  const url = `${process.env.API_BASE_URL}/contact`;

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...dataContact }),
    });

    if (!resp.ok) {
      const errorData = await resp.json(); // Obtener el mensaje de error como JSON
      throw new Error(errorData.message || 'Error al hacer fetch data');
    }

    const data = await resp.text();

    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      ok: false,
      message: error.message,
    };
  }
}
