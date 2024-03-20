import { usePayoutStore } from '@/stores';
import React, { ChangeEvent, useState } from 'react';

export const AccountType = () => {
  // const [accountType, setAccountType] = useState('');
  const accountType = usePayoutStore((store) => store.accountType);
  const setAccountType = usePayoutStore((store) => store.onSetAccountType);

  const handleAccountTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAccountType(e.target.value);
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold">Tipo de cuenta</h2>

      <div className="mt-2 flex items-center gap-2">
        <label className="text-base font-medium " htmlFor="personal">
          Personal
        </label>
        <input
          type="radio"
          id="personal"
          name="accountType"
          value="personal"
          className="w-4 h-4"
          checked={accountType === 'personal'}
          onChange={handleAccountTypeChange}
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-base font-medium" htmlFor="business">
          Empresa
        </label>
        <input
          type="radio"
          id="business"
          name="accountType"
          value="business"
          className="w-4 h-4 "
          checked={accountType === 'business'}
          onChange={handleAccountTypeChange}
        />
      </div>
    </div>
  );
};
