'use server';
import { cookies } from 'next/headers';
import { unstable_noStore as noStore } from 'next/cache';

/* ··········································································· */
/* Obtiene una orden de Seller con su id */
/* ··········································································· */
export async function getOrderById(id: string) {
  noStore();
  const token = cookies().get('token')?.value;
  let url = `${process.env.API_BASE_URL}/orders/s/${id}`;
  try {
    const resp = await fetch(url, {
      method: 'GET',
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

    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: 'ocurrió un error vea los logs' };
  }
}

/* ··········································································· */
/* Obtiene una orden de buyer con su id */
/* ··········································································· */
export async function getOrderBuyer(id: string) {
  noStore();
  const token = cookies().get('token')?.value;
  let url = `${process.env.API_BASE_URL}/orders/b/${id}`;
  try {
    const resp = await fetch(url, {
      method: 'GET',
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

    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: error.message };
  }
}

/* ··········································································· */
/* Obtiene una orden con su id */
/* ··········································································· */
export async function fetchOrderById(id: string) {
  noStore();
  const token = cookies().get('token')?.value;
  const url = `${process.env.API_BASE_URL}/orders/${id}`;

  try {
    const resp = await fetch(url, {
      method: 'GET',
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
    return data;
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: 'ocurrió un error vea los logs' };
  }
}
