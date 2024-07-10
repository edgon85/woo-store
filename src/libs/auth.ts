// lib/auth.ts
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Ajusta esta ruta según tu estructura

interface ExtendedUser {
  id: string;
  email: string;
  username: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  authType: string;
  profileImage: string;
  token: string;
}

export async function getAuthToken(): Promise<string | null> {
  const session = await getServerSession(authOptions);
  const user = session?.user as ExtendedUser | undefined;

  if (!user || !user.token) {
    console.error('No se encontró un token de autenticación');
    return null;
  }

  return user.token;
}
