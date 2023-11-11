'use server';
import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers';

export async function fetchPackageDelivery() {
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
