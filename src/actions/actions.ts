'use server';
import { IAddress, IProfile } from '@/interfaces';
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
    data: await response.json(),
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
    data: await response.json(),
    message: 'ok',
  };
}

/* ······································································· */

export async function updateProfile(
  profile: IProfile,
  image: boolean = false,
  urlImage?: string
) {
  const token = cookies().get('token')?.value;
  const { id, ...rest } = profile;
  const url = `${process.env.API_BASE_URL}/profiles/${id}`;

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(
        image
          ? { profileImage: urlImage }
          : {
              ...rest,
            }
      ),
    });

    if (!response.ok) {
      // Si la respuesta no es exitosa, se obtiene el mensaje de error del servidor
      const errorData = await response.json();
      console.log(errorData);
      return {
        data: null,
        error: errorData.error,
        message: errorData.message || 'Ocurrió un error desconocido', // Asegúrate de que este campo coincida con la estructura de tus respuestas de error
      };
    }
    // Si la respuesta es exitosa, se procesa la respuesta JSON
    const data = await response.json();
    return {
      data,
      error: null,
      message: 'ok',
    };
  } catch (error) {
    // Manejo de errores de red o errores al procesar la respuesta
    return {
      data: null,
      error,
      message: 'Error al conectar con el servidor',
    };
  }
}
/* ······································································· */

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
type DataUser = {
  id: string;
  fullName?: string;
  username?: string;
  email?: string;
  password?: string;
};
export async function updateUserData(dataUser: DataUser) {
  const token = cookies().get('token')?.value;
  const { id, ...rest } = dataUser;
  const url = `${process.env.API_BASE_URL}/auth/update/${id}`;

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...rest,
      }),
    });

    if (!response.ok) {
      // Si la respuesta no es exitosa, se obtiene el mensaje de error del servidor
      const errorData = await response.json();
      console.log(errorData);
      return {
        data: null,
        error: errorData.error,
        message: errorData.message || 'Ocurrió un error desconocido', // Asegúrate de que este campo coincida con la estructura de tus respuestas de error
      };
    }
    // Si la respuesta es exitosa, se procesa la respuesta JSON
    const data = await response.json();
    return {
      data,
      error: null,
      message: 'ok',
    };
  } catch (error) {
    // Manejo de errores de red o errores al procesar la respuesta
    return {
      data: null,
      error,
      message: 'Error al conectar con el servidor',
    };
  }
}

/* ······································································· */
export async function revalidateData(path: string, redirectUrl: string) {
  revalidatePath(path);
  redirect(redirectUrl);
}
