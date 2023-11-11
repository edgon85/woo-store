'use server';
import { IAddress } from '@/interfaces';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function createAddress(data: IAddress) {
  const token = cookies().get('token')?.value;
  const url = `${process.env.API_BASE_URL}/shipping-address`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...data,
    }),
  });

  if (!response.ok) {
    return {
      data: null,
      message: 'Ocurrió un error',
    };
  }

  return {
    data: response.json(),
    message: 'ok',
  };
}

export async function updateAddress(id: string, data: IAddress) {
  const token = cookies().get('token')?.value;
  const url = `${process.env.API_BASE_URL}/shipping-address/${id}`;

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...data,
    }),
  });

  if (!response.ok) {
    return {
      data: null,
      message: 'Ocurrió un error',
    };
  }

  return {
    data: response.json(),
    message: 'ok',
  };
}

export async function revalidateData(path: string, redirectUrl: string) {
  revalidatePath(path);
  redirect(redirectUrl);
}
