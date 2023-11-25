import { ListItem, ListItemProps } from './ListItem';

export const ListGroup = ({ userId }: { userId: string }) => {
  const navItems: ListItemProps[] = [
    { href: `/settings/profile/${userId}`, label: 'Datos de perfil' },
    { href: `/settings/account/${userId}`, label: 'Ajustes de cuenta' },
    { href: '/settings/shipments', label: 'Envíos' },
    { href: '/settings/payments', label: 'Pagos' },
    { href: '/settings/notification', label: 'Notificaciones' },
    { href: '/settings/privacy', label: 'Ajustes de privacidad' },
  ];

  return (
    <nav className="w-full text-base font-medium">
      {navItems.map((item) => (
        <ListItem key={item.href} {...item} />
      ))}
    </nav>
  );
};
