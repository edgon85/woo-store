'use server';

import { revalidatePath } from 'next/cache';
import { unstable_noStore as noStore } from 'next/cache';

import { ProductImage } from '@/interfaces';

import { v2 as cloudinary } from 'cloudinary';
import { getAuthToken } from '@/libs';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export async function deleteProductImage(image: ProductImage) {
  noStore();
  const authToken = await getAuthToken();

  if (!authToken) {
    return { ok: false, message: 'No se encontró un token de autenticación' };
  }

  const { id, url: imageUrl, productId } = image;
  const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? '';
  const url = `${process.env.API_BASE_URL}/products/${id}/image`;

  try {
    const { result } = await cloudinary.uploader.destroy(
      `woo-products/${imageName}`
    );

    if (result !== 'ok') {
      throw new Error('No se pudo cargar las imágenes, no se sube el producto');
    }

    const resp = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!resp.ok) {
      throw new Error('Failed to delete image');
    }

    revalidatePath(`/product/edit/${productId}`);
    return {
      ok: true,
      message: 'Imagen eliminada con éxito',
    };
  } catch (error) {
    return {
      ok: false,
      message: 'No se puedo eliminar la imagen',
    };
  }
}
