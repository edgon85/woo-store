import { PayoutMethod } from '@/interfaces';
import { CiBank } from 'react-icons/ci';

type Props = {
  payouts: PayoutMethod[];
};

export const ListOfPayouts = ({ payouts }: Props) => {
  return (
    <>
      {payouts.map((payout) => {
        const ultimosCuatroDigitos = payout.accountNumber.slice(-4);
        const numeroOculto =
          '·'.repeat(payout.accountNumber.length - 4) + ultimosCuatroDigitos;
        return (
          <div
            key={payout.id}
            className="py-4 px-2 w-6/12 flex justify-between items-center"
          >
            <div className="flex gap-2">
              <CiBank size={24} />
              <div>
                <p className="text-base">
                  Cuenta bancaria
                  {payout.isDefault && (
                    <span className="text-xs uppercase p-1 bg-cerise-red-300 rounded ml-1">
                      Predeterminado
                    </span>
                  )}
                </p>
                <p className="text-xs capitalize">
                  {payout.bank} <span>{numeroOculto}</span>
                </p>
                <p className="capitalize">{payout.ownerAccountName}</p>
              </div>
            </div>
            <button className="border border-black px-4 py-2 rounded hover:bg-cerise-red-300">Editar</button>
          </div>
        );
      })}
    </>
  );
};
