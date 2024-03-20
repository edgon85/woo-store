'use client';
import { usePayoutStore } from '@/stores';
import { ChangeEvent } from 'react';

export const FormBusiness = () => {
  const setOwnerAccountName = usePayoutStore(
    (store) => store.onSetOwnerAccountName
  );
  const firstName = usePayoutStore((store) => store.ownerAccountName.firstName);

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOwnerAccountName(e.target.value, e.target.value);
  };

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
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>
      </div>
    </form>
  );
};
