'use client';
import { AccountForm } from '@/components';
import { getUserProfile } from '@/helpers';
import { useAuth } from '@/hooks';
import { IUser, LocalDataUser } from '@/interfaces';
import { useEffect, useState } from 'react';

export default function AccountPage() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<LocalDataUser | null>(null); // Asumiendo que IProfile es el tipo de tus datos de perfil.

  useEffect(() => {
    if (user) {
      getProfile(user);
    }
  }, [user]);

  const getProfile = async (user: IUser) => {
    const datos = await getUserProfile(user.id, user.token);
    setProfileData({
      id: user.id,
      token: user.token,
      email: datos.email,
      fullName: datos.fullName,
      username: datos.username,
      authType: datos.authType,
    });
  };

  if (profileData === null) {
    return <>Cargando....</>;
  }

  return <AccountForm dataUser={profileData} />;
}
