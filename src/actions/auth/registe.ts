export async function makeRegisterUser(
  fullName: string,
  email: string,
  password: string
) {
  try {
    const authResponse = await fetch(
      `${process.env.API_BASE_URL}/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      }
    );

    if (!authResponse.ok) {
      const errorData = await authResponse.json(); // Obtener el mensaje de error como JSON
      throw new Error(errorData.message || 'Error al hacer fetch data');
    }

    const data = await authResponse.json();

    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: 'hay error',
    };
  }
}
