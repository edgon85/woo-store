'use client';
import { usePayoutStore } from '@/stores';
import { ChangeEvent } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export const FormBusiness = () => {
  const setOwnerAccountName = usePayoutStore(
    (store) => store.onSetOwnerAccountName
  );
  // const ownerAccountName = usePayoutStore((store) => store.ownerAccountName);

  const handleChange = useDebouncedCallback((term: string) => {
    setOwnerAccountName(term);
  }, 500);

  return (
    <form className="mt-4">
      <div className="border rounded p-4">
        <div className="mb-3 flex flex-col">
          <label
            htmlFor="first_name"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Nombre de la empresa
          </label>
          <input
            id="first_name"
            type="text"
            className="block w-full p-4 text-gray-900 border border-divider rounded-md  sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
            // value={ownerAccountName}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
};
