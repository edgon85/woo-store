'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { getAuthToken } from '@/libs';

type SearchOptions = {
  searchTerm: string;
  gender?: string;
  clothesType?: string;
  category?: string;
  subcategory?: string;
  page?: number;
  pageSize?: number;
  brands?: string[];
  clothesState?: string[];
  colors?: string[];
  measurements?: string[];
  minPrice?: number;
  maxPrice?: number;
};

export async function searchProduct({
  searchTerm,
  gender,
  clothesType,
  category,
  subcategory,
  page = 1,
  pageSize = 4,
  brands,
  clothesState,
  colors,
  measurements,
  minPrice,
  maxPrice,
}: SearchOptions) {
  noStore();
  const authToken = await getAuthToken();
  const skip = (page - 1) * pageSize;
  const url = new URL(`${process.env.API_BASE_URL}/products/search`);

  // Add base parameters
  url.searchParams.append('searchTerm', searchTerm);
  if (gender) url.searchParams.append('gender', gender);
  if (clothesType) url.searchParams.append('clothesType', clothesType);
  if (category) url.searchParams.append('category', category);
  if (subcategory) url.searchParams.append('subcategory', subcategory);

  url.searchParams.append('take', pageSize.toString());
  url.searchParams.append('skip', skip.toString());

  // Add filter parameters
  if (brands)
    brands.forEach((brand) => url.searchParams.append('brands[]', brand));

  if (clothesState)
    clothesState.forEach((clothesState) =>
      url.searchParams.append('clothesState[]', clothesState)
    );

  if (colors)
    colors.forEach((color) => url.searchParams.append('colors[]', color));

  if (measurements)
    measurements.forEach((measurements) =>
      url.searchParams.append('measurements[]', measurements)
    );

  if (minPrice !== undefined)
    url.searchParams.append('minPrice', minPrice.toString());

  if (maxPrice !== undefined)
    url.searchParams.append('maxPrice', maxPrice.toString());
  // Add other filter parameters here

  try {
    const resp = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!resp.ok) {
      const errorData = await resp.json();
      throw new Error(errorData.message || 'Error al hacer fetch data');
    }

    const data = await resp.json();

    // return data;

    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: error.message };
  }
}
