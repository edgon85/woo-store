// lib/auth.ts
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils';
import { IUser } from '@/interfaces';
import { getProviders } from 'next-auth/react';

export async function getAuthInfo(): Promise<IUser | null> {
  const session = await getServerSession(authOptions);
  const user = session?.user as IUser | undefined;

  return {
    id: user?.id || '',
    email: user?.email || '',
    username: user?.username || '',
    fullName: user?.fullName || '',
    isActive: user?.isActive || false,
    roles: user?.roles || [],
    authType: user?.authType || 'credentials',
    profileImage: user?.profileImage || '',
    token: user?.token || 'no-token',
  };
}

// Mantén la función getAuthToken por compatibilidad si la necesitas
export async function getAuthToken(): Promise<string | null> {
  const authInfo = await getAuthInfo();
  return authInfo?.token || null;
}

export async function getAuthProviders() {
  const session = await getServerSession(authOptions);
  const providers = await getProviders();

  return { session, providers };
}
