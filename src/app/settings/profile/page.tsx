'use client';
import { ProfileForm } from '@/components';
import { getUserProfile } from '@/helpers';
import { useAuth } from '@/hooks';
import { IProfile, IUser } from '@/interfaces';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<IProfile | null>(null); // Asumiendo que IProfile es el tipo de tus datos de perfil.

  useEffect(() => {
    if (user) {
      getProfile(user);
    }
  }, [user]);

  const getProfile = async (user: IUser) => {
    const datos = await getUserProfile(user.id, user.token);
    setProfileData(datos.profile);
  };

  if (profileData === null) {
    return <>Cargando....</>;
  }

  return <ProfileForm profile={profileData!} token={user?.token!} />;
}
