import {
  EmptyTransaction,
  PageLoadingSkeleton,
  TableSales,
} from '@/components';

import { fetchOrders } from '@/actions';
import { Metadata } from 'next';
import { Suspense } from 'react';
import NotFound from '../../not-found';

export const metadata: Metadata = {
  title: 'Mis ventas',
};

export default async function Page() {
  const { data, ok } = await fetchOrders('seller');

  if (!ok) {
    NotFound();
  }

  if (data.length === 0)
    return (
      <EmptyTransaction
        label="¡Aun no tienes ventas!"
        subLabel="¡Consigue tu primera venta! Cuantas más prendas publiques, más oportunidades de vender."
        path="/product/create"
        btnText="Subir prenda"
      />
    );

  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <main>
        <TableSales orders={data} />
      </main>
    </Suspense>
  );
}
