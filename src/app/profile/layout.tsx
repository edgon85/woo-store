import { HeaderProfile, Tabs } from '@/components';
import { ListItemProps } from '@/interfaces';

type Props = {
  children: React.ReactNode;
};

// { params: { user } }: { params: { user: string } }
export default function ProfileLayout({ children }: Props) {
  const navItems: ListItemProps[] = [
    { href: '/settings/profile', label: 'Datos de perfil' },
    { href: '/settings/account', label: 'Ajustes de cuenta' },
  ];

  return (
    <div className="px-4 lg:px-0 main-wrapper pt-4 pb-4">
      <HeaderProfile />
      <Tabs ListOfTabs={navItems} />
      <main>{children}</main>
    </div>
  );
}
