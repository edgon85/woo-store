import { ListItem, ListItemProps } from './ListItem';

export const ListGroup = ({
  userId,
  isMovil,
}: {
  userId: string;
  isMovil?: boolean;
}) => {
  const navItems: ListItemProps[] = [
    {
      id: 'profile',
      href: `/settings/profile/${userId}`,
      label: 'Datos de perfil',
    },
    {
      id: 'account',
      href: `/settings/account/${userId}`,
      label: 'Ajustes de cuenta',
    },
    {
      id: 'purchases',
      href: '/settings/transactions/purchases',
      label: 'Mis pedidos',
    },
    { id: 'sales', href: '/settings/transactions/sales', label: 'Mis ventas' },
    { id: 'balance', href: '/settings/balance', label: 'Mi balance' },
    /*  {
      id: 'payments',
      href: '/settings/payments',
      label: 'pagos',
    }, */
    {
      id: 'payout-methods',
      href: '/settings/payments/payout-methods',
      label: 'Cobros',
    },
    {
      id: 'notifications',
      href: '/settings/notification',
      label: 'Notificaciones',
    },
    {
      id: 'privacy',
      href: '/settings/privacy',
      label: 'Ajustes de privacidad',
    },
  ];

  return (
    <nav className="w-full text-base font-medium">
      {navItems.map((item) => (
        <ListItem key={item.id} {...item} isMovil={isMovil} />
      ))}
    </nav>
  );
};
