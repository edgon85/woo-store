'use server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

/* ··········································································· */
/* Obtiene lista de ofertas recibidas*/
/* ··········································································· */
export async function acceptOffer(offerId: string) {
  const token = cookies().get('token')?.value;
  let url = `${process.env.API_BASE_URL}/offer/${offerId}/accept`;
  try {
    const resp = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!resp.ok) {
      const errorData = await resp.json(); // Obtener el mensaje de error como JSON
      throw new Error(errorData.message || 'Error al hacer fetch data');
    }

    const data = await resp.json();

    revalidatePath(`/offers`);
    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: 'ocurrió un error vea los logs' };
  }
}
