import { AccountForm } from '@/components';
import { fetchUserProfile } from '@/actions';
import { redirect } from 'next/navigation';

export default async function AccountPage({
  params,
}: {
  params: { id: string };
}) {
  const { ok, data, message } = await fetchUserProfile(params.id);

  if (!ok) {
    redirect('/404');
  }
  return <AccountForm user={data!} />;
}
