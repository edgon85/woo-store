'use server';

import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
import { getAuthInfo, getAuthToken } from '@/libs';
import { IProduct } from '@/interfaces';
import sharp from 'sharp';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

/* ··········································································· */

export async function createProduct(
  product: IProduct,
  formImagesData: FormData
) {
  const authToken = await getAuthToken();
  const userInfo = await getAuthInfo();

  if (!authToken) {
    return { ok: false, message: 'No se encontró un token de autenticación' };
  }
  const url = `${process.env.API_BASE_URL}/products`;
  const { images, slug, ...restProduct } = product;

  // Proceso de carga y guardado de imágenes
  // Recorrer las imágenes y guardarlas

  try {
    const cloudinaryImages = await uploadImages(
      formImagesData.getAll('images') as File[]
    );
    if (!cloudinaryImages) {
      throw new Error('No se pudo cargar las imágenes, no se sube el producto');
    }

    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        ...restProduct,
        images: cloudinaryImages,
        coverImage: cloudinaryImages[0],
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

export const addImagesByProductId = async (dataToUpdate: FormData) => {
  const authToken = await getAuthToken();

  if (!authToken) {
    return { ok: false, message: 'No se encontró un token de autenticación' };
  }
  const productId = dataToUpdate.get('productId');
  const files = dataToUpdate.getAll('images') as File[];
  const url = `${process.env.API_BASE_URL}/products/${productId}/images`;

  try {
    const cloudinaryImages = await uploadImages(files);
    if (!cloudinaryImages) {
      throw new Error('No se pudo cargar las imágenes, no se sube el producto');
    }

    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        images: cloudinaryImages,
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

async function uploadImages(images: File[]) {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();

        // Procesar la imagen con sharp
        const processedBuffer = await sharp(Buffer.from(buffer))
          .resize({
            width: 800,
            height: 800,
            fit: sharp.fit.inside, // Ajusta la imagen dentro de 800x800 sin recortar
            withoutEnlargement: true, // Evita agrandar imágenes más pequeñas
          })
          .toFormat('webp', { quality: 80 }) // Cambiar el formato de la imagen (puedes ajustar según sea necesario)
          .toBuffer();

        // Convertir la imagen procesada a base64
        const base64Image = processedBuffer.toString('base64');

        return cloudinary.uploader
          .upload(`data:image/webp;base64,${base64Image}`, {
            folder: 'woo-products',
          })
          .then((r) => r.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    // Esperar a que todas las imágenes se suban
    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.error('Error en el proceso de subida de imágenes:', error);
    return null;
  }
}

/* cloudinary  */
/* 
transformation: [
      { gravity: 'face', height: 500, width: 500, crop: 'fill' },
      { fetch_format: 'jpg' },
    ], 
*/
/* 
eager: [
      { width: 400, height: 400, crop: 'crop', gravity: 'face' },
      { width: 400, height: 400, crop: 'pad' },
    ], 
*/
