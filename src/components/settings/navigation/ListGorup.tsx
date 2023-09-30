import { ListItem, ListItemProps } from './ListItem';

const navItems: ListItemProps[] = [
  { href: '/settings/profile', label: 'Datos de perfil', isCurrent: true },
  { href: '/settings/account', label: 'Ajustes de cuenta' },
  { href: '#', label: 'Envíos' },
  { href: '#', label: 'Download' },
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
