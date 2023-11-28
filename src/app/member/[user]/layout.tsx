import { HeaderProfile, Tabs } from '@/components';

export default function ProfileLayout({
  params,
  children,
}: {
  params: { user: string };
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 lg:px-0 main-wrapper pt-4 pb-4">
      <HeaderProfile username={params.user} />
      <Tabs username={params.user} />
      <main>{children}</main>
    </div>
  );
}
