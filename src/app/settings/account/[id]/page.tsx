import { AccountForm } from '@/components';
import { fetchUserProfile } from '@/actions';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mi cuenta',
};

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
