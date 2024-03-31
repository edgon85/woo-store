import { RadiaSelectIcon } from '@/components/ui';
import { usePayoutStore } from '@/stores';
import clsx from 'clsx';

export const SelectAccountTypeBank = () => {
  const [accountTypeBank, setAccountTypeBank] = usePayoutStore((state) => [
    state.accountTypeBank,
    state.setAccountTypeBank,
  ]);

  return (
    <div>
      <div
        className={clsx('border w-full rounded-md mt-4 cursor-pointer', {
          'border-cerise-red-600': accountTypeBank === 'monetarios',
        })}
        onClick={() => setAccountTypeBank('monetarios')}
      >
        <div className="flex items-center px-2 py-4 gap-2">
          {/* <CiBank size={24} /> */}
          <div className="flex justify-between w-full items-center">
            <div>
              <p>Monetarios</p>
            </div>
            {accountTypeBank === 'monetarios' && (
              <RadiaSelectIcon size="16" className="text-cerise-red-600" />
            )}
          </div>
        </div>
      </div>

      <div
        className={clsx('border w-full rounded-md mt-4 cursor-pointer', {
          'border-cerise-red-600': accountTypeBank === 'ahorros',
        })}
        onClick={() => setAccountTypeBank('ahorros')}
      >
        <div className="flex items-center px-2 py-4 gap-2">
          {/* <CiBank size={24} /> */}
          <div className="flex justify-between w-full items-center">
            <div>
              <p>Ahorros</p>
            </div>
            {accountTypeBank === 'ahorros' && (
              <RadiaSelectIcon size="16" className="text-cerise-red-600" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
