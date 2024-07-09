'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function checkImageAvailable(
  profileImage: string
): Promise<string | null> {
  let urlImage: string | null = null;

  await fetch(profileImage, {
    method: 'HEAD',
  })
    .then((resp) => {
      if (resp.ok) {
        urlImage = profileImage;
      } else {
        console.error('La imagen no está disponible');
        urlImage = null;
      }
    })
    .catch((error) => {
      console.error('Error al verificar la imagen');
    });

  return urlImage;
}

/* ······································································· */
export async function revalidateData(path: string, redirectUrl: string) {
  revalidatePath(path);
  redirect(redirectUrl);
}
