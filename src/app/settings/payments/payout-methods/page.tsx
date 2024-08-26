import { getPayoutByUser } from '@/actions';
import { ListOfPayouts } from '@/components';
import { getAuthInfo } from '@/libs';
import { Metadata } from 'next';

import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Métodos de pago',
};

export default async function PayoutMethodsPage() {
  const userInfo = await getAuthInfo();
  const { id: currentUserId } = userInfo!;

  const payoutList = await getPayoutByUser(currentUserId);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">Cómo recibes los cobros</h2>
      <p className="w-full md:w-6/12">
        Puedes enviar tu dinero a una o más formas de cobro. Para administrar
        las formas cobro o asignar un contribuyente, utiliza el menú para editar
        cada caso
      </p>

      <ListOfPayouts payouts={payoutList} />

      <div>
        <Link
          href={'/settings/payments/payout-methods/add'}
          className="border p-2 rounded bg-cerise-red-600 hover:bg-cerise-red-500 text-white"
        >
          Agregar una forma de cobro
        </Link>
      </div>
    </div>
  );
}
