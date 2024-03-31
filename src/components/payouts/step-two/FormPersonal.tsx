'use client';
import { usePayoutStore } from '@/stores';
import { ChangeEvent, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export const FormPersonal = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const setOwnerAccountName = usePayoutStore(
    (store) => store.onSetOwnerAccountName
  );

  const handleFirstNameChange = useDebouncedCallback((term: string) => {
    setFirstName(term);
    setOwnerAccountName(term);
  }, 500);

  const handleLastNameChange = useDebouncedCallback((term: string) => {
    setLastName(term);
    const fullName = `${firstName} ${term}`;
    setOwnerAccountName(fullName);
  }, 500);

  return (
    <form className="mt-4">
      <p className="mb-2">Nombres y apellidos del titular de la cuenta</p>
      <div className="border rounded p-4">
        <div className="mb-3 flex flex-col">
          <label
            htmlFor="first_name"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Nombre
          </label>
          <input
            id="first_name"
            type="text"
            className="block w-full p-4 text-gray-900 border border-divider rounded-md  sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
            onChange={(e) => handleFirstNameChange(e.target.value)}
          />
        </div>

        <div className="mb-3 flex flex-col">
          <label
            htmlFor="last_name"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Apellidos
          </label>
          <input
            id="first_name"
            type="text"
            className="block w-full p-4 text-gray-900 border border-divider rounded-md  sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
            onChange={(e) => handleLastNameChange(e.target.value)}
          />
        </div>
      </div>
      <span className="text-xs">
        Ingresa el nombre del titular de la cuenta exactamente como aparece en
        los estados de cuenta bancarios.
      </span>
    </form>
  );
};
