'client';
import { usePayoutStore } from '@/stores';
import { useDebouncedCallback } from 'use-debounce';

export const FormAccountNumber = () => {
  const setBankNumber = usePayoutStore((store) => store.setAccountNumber);
  // const bankNumber = usePayoutStore((store) => store.accountNumber);

  const handleChange = useDebouncedCallback((term: string) => {
    setBankNumber(term);
  }, 500);

  return (
    <form className="mt-4 w-full">
      <div className="border rounded p-4">
        <div className="mb-3 flex flex-col">
          <label
            htmlFor="first_name"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Numero de cuenta
          </label>
          <input
            id="first_name"
            type="number"
            // value={bankNumber}
            className="block w-full p-4 text-gray-900 border border-divider rounded-md  sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
};
