import { PayoutMethod } from '@/interfaces';
import { BtnEditPayout } from './buttons/BtnEditPayout';
import { BankIcon } from '../ui';

type Props = {
  payouts: PayoutMethod[];
};

export const ListOfPayouts = ({ payouts }: Props) => {
  return (
    <>
      {payouts.map((payout) => {
        const lastFourDigits = payout.accountNumber.slice(-4);
        const numeroOculto =
          '·'.repeat(payout.accountNumber.length - 4) + lastFourDigits;
        return (
          <div
            key={payout.id}
            className="py-4 px-2 w-full md:w-6/12 flex justify-between items-center"
          >
            <div className="flex gap-2">
              <BankIcon />
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
                {!payout.isVerified && (
                  <span className="text-xs text-cerise-red-800">
                    Pendiente de verificar
                  </span>
                )}
              </div>
            </div>
            {/* <button className="border border-black px-4 py-2 rounded hover:bg-cerise-red-300">
              Editar
            </button> */}

            <BtnEditPayout payoutMethod={payout} />
          </div>
        );
      })}
    </>
  );
};
