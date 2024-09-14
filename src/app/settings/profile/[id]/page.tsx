import { ProfileForm } from '@/components';
import { fetchUserProfile } from '@/actions';
import { Metadata } from 'next';
import NotFound from '../../not-found';

export const metadata: Metadata = {
  title: 'Mi perfil',
};

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { ok, data, message } = await fetchUserProfile(params.id);

  if (!ok) {
    NotFound();
  }

  const { profile, fullName } = data!;

  return (
    <ProfileForm profile={profile!} fullName={fullName} userId={params.id} />
  );
}
