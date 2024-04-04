'use server';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function deletePayoutMethod(payoutMethodId: string) {
  noStore();
  const token = cookies().get('token')?.value;

  const url = `${process.env.API_BASE_URL}/payout-method/${payoutMethodId}`;

  try {
    const resp = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!resp.ok) {
      const errorData = await resp.json(); // Obtener el mensaje de error como JSON
      throw new Error(errorData.message || 'Error al hacer fetch data');
    }

    const data = await resp.text();
    revalidatePath(`/settings/payments/payout-methods`);
    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: 'ocurrió un error vea los logs' };
  }
}
