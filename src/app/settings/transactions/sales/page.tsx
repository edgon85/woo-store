import { EmptyTransaction, TableSales } from '@/components';

import { fetchOrders } from '@/lib';

export default async function Page() {
  const orders = await fetchOrders('seller');

  if (orders.length === 0)
    return (
      <EmptyTransaction
        label="¡Aun no tienes ventas!"
        subLabel="¡Consigue tu primera venta! Cuantas más prendas publiques, más oportunidades de vender."
        path="/products/create"
        btnText="Subir prenda"
      />
    );

  return (
    <main>
      <TableSales orders={orders} />
    </main>
  );
}
