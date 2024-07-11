// lib/auth.ts
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Ajusta esta ruta según tu estructura
import { IUser } from '@/interfaces';

export async function getAuthInfo(): Promise<IUser | null> {
  const session = await getServerSession(authOptions);
  const user = session?.user as IUser | undefined;

  if (!user || !user.token) {
    console.error('No se encontró un token de autenticación');
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    fullName: user.fullName,
    isActive: user.isActive,
    roles: user.roles,
    authType: user.authType || 'credentials',
    profileImage: user.profileImage,
    token: user.token,
  };
}

// Mantén la función getAuthToken por compatibilidad si la necesitas
export async function getAuthToken(): Promise<string | null> {
  const authInfo = await getAuthInfo();
  return authInfo?.token || null;
}
