'use server';
import { revalidatePath } from 'next/cache';
import { getAuthToken } from '@/libs';

type AddressData = {
  fullName: string;
  streetAddress: string;
  phone: string;
  label: string | null;
  isPrimary?: boolean;
  municipality: string;
  department: string;
};

export async function createAddress(addressData: AddressData) {
  const { municipality, department, ...rest } = addressData;
  const authToken = await getAuthToken();

  if (!authToken) {
    return { ok: false, message: 'No se encontró un token de autenticación' };
  }
  const url = `${process.env.API_BASE_URL}/shipping-address`;

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        ...rest,
        municipalitySlug: municipality,
        departmentSlug: department,
      }),
    });

    if (!resp.ok) {
      const errorData = await resp.json(); // Obtener el mensaje de error como JSON
      throw new Error(errorData.message || 'Error al hacer fetch data');
    }

    const data = await resp.json();

    //revalidatePath(`/settings/transactions/purchases`);

    console.log(data);
    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: error.message };
  }
}
