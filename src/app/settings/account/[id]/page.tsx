import { AccountForm } from '@/components';
import { fetchUserProfile } from '@/actions';
import { Metadata } from 'next';
import NotFound from '../../not-found';

export const metadata: Metadata = {
  title: 'Mi cuenta',
};

export default async function AccountPage({
  params,
}: {
  params: { id: string };
}) {
  const { ok, data } = await fetchUserProfile(params.id);

  if (!ok) {
    NotFound();
  }
  return <AccountForm user={data!} />;
}
