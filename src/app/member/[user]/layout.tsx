import { fetchPublicProfile } from '@/actions';
import { HeaderProfile, Tabs } from '@/components';
import NotFound from './not-found';

export default async function ProfileLayout({
  params,
  children,
}: {
  params: { user: string };
  children: React.ReactNode;
}) {
  const {
    ok,
    message: messageData,
    data: userData,
  } = await fetchPublicProfile(params.user);

  if (!ok) {
    return <NotFound message={messageData} />;
  }

  return (
    <div className="px-4 lg:px-0 main-wrapper pt-4 pb-4">
      <HeaderProfile username={params.user} profile={userData} />
      <Tabs username={params.user} />
      <main>{children}</main>
    </div>
  );
}
