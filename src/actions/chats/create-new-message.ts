'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function createNewMessageForChat(
  message: string,
  toId: string,
  productId: string
) {
  const token = cookies().get('token')?.value;
  const url = `${process.env.API_BASE_URL}/inbox-messages/new-message`;

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: { message, to: toId, productId } }),
    });

    if (!resp.ok) {
      const errorData = await resp.json(); // Obtener el mensaje de error como JSON
      throw new Error(errorData.message || 'Error al hacer fetch data');
    }

    const data = await resp.json();

    revalidatePath(`/inbox`);

    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: 'ocurrió un error vea los logs' };
  }
}
