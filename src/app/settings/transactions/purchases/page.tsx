import { EmptyTransaction, TablePurchases } from '@/components';

import { fetchOrders } from '@/actions';
import { IOrder } from '@/interfaces';

export default async function Page() {
  const orders = (await fetchOrders('buyer')) as IOrder[];

  if (orders.length === 0)
    return (
      <EmptyTransaction
        label="¡Aun no tienes compras!"
        subLabel="Explora una amplia variedad de artículos exclusivos."
        btnText="Ir de compras"
        path="/"
      />
    );

  return (
    <main>
      <TablePurchases orders={orders} />
    </main>
  );
}
