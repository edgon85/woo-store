import {
  EmptyTransaction,
  PageLoadingSkeleton,
  TablePurchases,
} from '@/components';

import { fetchOrders } from '@/actions';
import { Metadata } from 'next';
import { Suspense } from 'react';
import NotFound from '../../not-found';

export const metadata: Metadata = {
  title: 'Ordenes',
};

export default async function PurchasesPage() {
  const { data, ok } = await fetchOrders('buyer');

  if (!ok) {
    NotFound();
  }

  if (data.length === 0)
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
      <Suspense fallback={<PageLoadingSkeleton />}>
        <TablePurchases orders={data} />
      </Suspense>
    </main>
  );
}
