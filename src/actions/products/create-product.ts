'use server';

import { revalidatePath } from 'next/cache';
import { getAuthInfo, getAuthToken } from '@/libs';
import { IProduct } from '@/interfaces';

/* ··········································································· */

export async function createProduct(product: IProduct, imageList: string[]) {
  const authToken = await getAuthToken();
  const userInfo = await getAuthInfo();

  if (!authToken) {
    return { ok: false, message: 'No se encontró un token de autenticación' };
  }
  const url = `${process.env.API_BASE_URL}/products`;
  const { images, slug, ...restProduct } = product;

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        ...restProduct,
        images: imageList,
        coverImage: imageList[0],
      }),
    });

    if (!resp.ok) {
      const errorData = await resp.json(); // Obtener el mensaje de error como JSON
      throw new Error(errorData.message || 'Error al hacer fetch data');
    }
    const response = await resp.text();

    revalidatePath(`/member/${userInfo?.username}`);
    return {
      ok: true,
      data: {
        message: response,
        user: userInfo?.username,
      },
    };
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: error.message };
  }
}

export const addImagesByProductId = async (
  productId: string,
  images: string[]
) => {
  const authToken = await getAuthToken();

  if (!authToken) {
    return { ok: false, message: 'No se encontró un token de autenticación' };
  }

  const url = `${process.env.API_BASE_URL}/products/${productId}/images`;

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        images: images,
      }),
    });

    if (!resp.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await resp.json();

    revalidatePath(`/product/edit/${productId}`);
    return {
      ok: true,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      message: 'no se pudo crear, revisar los logs',
    };
  }
};
