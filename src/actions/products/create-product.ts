'use server';
import { cookies } from 'next/headers';
import { IPackageDelivery } from '../../lib/interfaces';

/* ··········································································· */
export async function fetchPackageDeliveries(): Promise<IPackageDelivery[]> {
  const token = cookies().get('token')?.value;
  const url = `${process.env.API_BASE_URL}/package-delivery/all`;

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

  const data: IPackageDelivery[] = await res.json();
  return data;
}
