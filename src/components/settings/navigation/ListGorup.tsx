import { ListItem, ListItemProps } from './ListItem';

const navItems: ListItemProps[] = [
  { href: '/settings/profile', label: 'Datos de perfil' },
  { href: '/settings/account', label: 'Ajustes de cuenta', },
  { href: '/settings/shipments', label: 'Envíos' },
  { href: '/settings/payments', label: 'Pagos' },
  { href: '/settings/notification', label: 'Notificaciones' },
  { href: '/settings/privacy', label: 'Ajustes de privacidad' },
];

export const ListGroup = () => {
  return (
    <nav className="w-full text-base font-medium">
      {navItems.map((item) => (
        <ListItem key={item.href} {...item} />
      ))}
    </nav>
  );
};
