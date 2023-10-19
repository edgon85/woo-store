'use client';
import { HeaderProfile, Tabs } from '@/components';
import { getUserPublicProfile } from '@/helpers';
import { ListItemProps } from '@/interfaces';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function ProfileLayout({ children }: Props) {
  const params = useParams();

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const navItems: ListItemProps[] = [
    { href: `/member/${params.user}`, label: 'Productos' },
    { href: `/member/${params.user}/ratings`, label: 'Valoraciones' },
  ];

  useEffect(() => {
    getData(`${params.user}`);
  }, [params.user]);

  const getData = async (username: string) => {
    const response = await getUserPublicProfile(username);
    if (response.message === 'ok') {
      setProfileData(response.data);
    } else {
      setErrorMessage(response.message);
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }
  return (
    <div className="px-4 lg:px-0 main-wrapper pt-4 pb-4">
      <HeaderProfile userData={profileData!} />
      <Tabs ListOfTabs={navItems} />
      <main>{children}</main>
    </div>
  );
}
