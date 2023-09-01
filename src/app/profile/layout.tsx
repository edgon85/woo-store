import { HeaderProfile, Tabs } from '@/components';

type Props = {
  children: React.ReactNode;
};

// { params: { user } }: { params: { user: string } }
export default function ProfileLayout({ children }: Props) {
  return (
    <div className="px-4 lg:px-0 main-wrapper pt-4 pb-4">
      <HeaderProfile />
      <Tabs />
      <main>{children}</main>
    </div>
  );
}
