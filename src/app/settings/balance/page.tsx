import { getOrdersNoPaid, getOrdersPaid } from '@/actions';
import { TableNoPaid, TablePaid } from '@/components';
import { formatCurrency } from '@/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mi balance',
};

export default async function BalancePage() {
  const { ok, data } = await getOrdersNoPaid();
  const { data: OrdersPaid } = await getOrdersPaid();

  return (
    <>
      <div className="flex flex-col gap-8">
        <p className="text-base">
          Tu dinero se enviara a tu banco 48 horas después de que le llegue la
          prenda al comprador y confirme que toso esta bien con su prenda.
        </p>
        {data.orders.length !== 0 ? <TableNoPaid data={data} /> : null}

        <TablePaid data={OrdersPaid} />
      </div>
    </>
  );
}
