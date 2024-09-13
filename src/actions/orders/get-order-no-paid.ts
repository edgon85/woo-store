'use server';

import { getAuthToken } from '@/libs';
import { unstable_noStore as noStore } from 'next/cache';

export async function getOrdersNoPaid() {
  noStore();
  const authToken = await getAuthToken();

  if (!authToken) {
    return { ok: false, message: 'No se encontró un token de autenticación' };
  }
  let url = `${process.env.API_BASE_URL}/orders/no-paid`;
  try {
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
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

export async function getOrdersPaid() {
  noStore();
  const authToken = await getAuthToken();

  if (!authToken) {
    return { ok: false, message: 'No se encontró un token de autenticación' };
  }
  let url = `${process.env.API_BASE_URL}/orders/order-paid`;
  try {
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
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
