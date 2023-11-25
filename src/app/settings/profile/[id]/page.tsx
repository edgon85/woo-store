import { ProfileForm } from '@/components';
import { fetchUserProfile } from '@/lib';

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const userProfile = await fetchUserProfile(params.id);

  const { profile, fullName } = userProfile;

  return (
    <ProfileForm profile={profile!} fullName={fullName} userId={params.id} />
  );
}
