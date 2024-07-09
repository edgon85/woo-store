import { ProfileForm } from '@/components';
import { fetchUserProfile } from '@/actions';

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { ok, data, message } = await fetchUserProfile(params.id);

  const { profile, fullName } = data!;

  return (
    <ProfileForm profile={profile!} fullName={fullName} userId={params.id} />
  );
}
