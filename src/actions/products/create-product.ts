'use server';
import { cookies } from 'next/headers';
import { IPackageDelivery } from '../../lib/interfaces';
import { IProduct } from '@/interfaces';

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

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

export async function createProduct(
  product: IProduct,
  formImagesData: FormData
) {
  const token = cookies().get('token')?.value;
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
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...restProduct,
        images: cloudinaryImages,
      }),
    });

    if (!resp.ok) {
      throw new Error('Failed to fetch data');
    }

    return {
      ok: true,
      data: resp.json(),
    };
  } catch (error) {
    return {
      ok: false,
      message: 'no se pudo crear, revisar los logs',
    };
  }
}

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`, {
            folder: 'woo-products',
          })
          .then((r) => r.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.log(error);
    return null;
  }
};
