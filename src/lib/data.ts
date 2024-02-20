'use server';
import { IProduct, IUser } from '@/interfaces';
import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers';
import { IOrder, IPackageDelivery, IPaymentMethod } from './interfaces';

/* ··········································································· */
export const fetchUserProfile = async (userId: string): Promise<IUser> => {
  noStore();
  const token = cookies().get('token')?.value;
  const url = `${process.env.API_BASE_URL}/profiles/user/${userId}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data: IUser = await res.json();
  return data;
};

/* ··········································································· */
export const fetchPublicProfile = async (username: string) => {
  const url = `${process.env.API_BASE_URL}/profiles?u=${username}`;

  const resp = await fetch(url);

  if (!resp.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await resp.json();
  return data;
};

/* ··········································································· */
export const getProductBySlug = async (
  productSlug: string
): Promise<IProduct> => {
  noStore();
  const url = `${process.env.API_BASE_URL}/products/${productSlug}`;

  const resp = await fetch(url);

  if (!resp.ok) {
    throw new Error('Failed to fetch data');
  }

  const data: IProduct = await resp.json();
  return data;
};

/* ··········································································· */
export async function fetchShippingAddress() {
  noStore();
  const token = cookies().get('token')?.value;
  const url = `${process.env.API_BASE_URL}/shipping-address`;

  const res = await fetch(url, {
    method: 'GET', // o 'POST', 'PUT', 'DELETE', etc.
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    // Si estás haciendo una solicitud POST o PUT, también enviarías 'body' aquí
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

/* ··········································································· */
export async function fetchPaymentMethods(): Promise<IPaymentMethod[]> {
  noStore();
  const token = cookies().get('token')?.value;
  const url = `${process.env.API_BASE_URL}/payment-methods`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data: IPaymentMethod[] = await res.json();
  return data;
}

/* ··········································································· */
export async function fetchPackageDelivery(
  ids: number[]
): Promise<IPackageDelivery[]> {
  noStore();
  const token = cookies().get('token')?.value;
  const queryString = `?ids=${ids.join(',')}`;
  const url = `${process.env.API_BASE_URL}/package-delivery${queryString}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.log(res);
    throw new Error('Failed to fetch data');
  }

  const data: IPackageDelivery[] = await res.json();
  return data;
}

/* ··········································································· */
export async function fetchOrders(type: string): Promise<IOrder[]> {
  noStore();
  const token = cookies().get('token')?.value;
  const url = `${process.env.API_BASE_URL}/orders?type=${type}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data: IOrder[] = await res.json();
  return data;
}

/* ··········································································· */
export async function fetchOrderById(id: string): Promise<IOrder> {
  noStore();
  const token = cookies().get('token')?.value;
  const url = `${process.env.API_BASE_URL}/orders/${id}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data: IOrder = await res.json();
  return data;
}

/* ··········································································· */
export async function fetchData(path: string) {
  const url = `${process.env.API_BASE_URL}${path}`;

  try {
    const resp = await fetch(url);

    if (!resp.ok) {
      const errorData = await resp.json(); // Obtener el mensaje de error como JSON
      throw new Error(errorData.message || 'Error al hacer fetch data');
    }

    return await resp.json();
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: 'ocurrió un error vea los logs' };
  }
}
