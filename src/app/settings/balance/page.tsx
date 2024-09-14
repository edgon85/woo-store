import { getOrdersNoPaid, getOrdersPaid } from '@/actions';
import { TableNoPaid, TablePaid } from '@/components';
import { formatCurrency } from '@/utils';
import { Metadata } from 'next';
import NotFound from '../not-found';

export const metadata: Metadata = {
  title: 'Mi balance',
};

export default async function BalancePage() {
  const { ok, data } = await getOrdersNoPaid();
  const { data: OrdersPaid } = await getOrdersPaid();

  if (!ok) {
    NotFound();
  }

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="mb-6 p-4 bg-blue-100 rounded-lg">
          <p className="text-gray-700 whitespace-pre-wrap">
            Tu dinero se enviara a tu banco 48 horas después de que le llegue la
            prenda al comprador y confirme que todo esta bien con su prenda.
          </p>
        </div>
        {data.orders.length !== 0 ? <TableNoPaid data={data} /> : null}

        <TablePaid data={OrdersPaid} />
      </div>
    </>
  );
}
