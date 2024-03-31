'use client';

import { useAuth } from '@/hooks';
import { usePayoutStore } from '@/stores';
import { ChangeEvent, useState } from 'react';
import { AccountType } from './step-two/AccountType';
import { FormPersonal } from './step-two/FormPersonal';
import { FormBusiness } from './step-two/FormBusiness';
import clsx from 'clsx';

export const StepTwo = () => {
  const [currentStep, bankAccountHolder, accountType, ownerAccountName] =
    usePayoutStore((store) => [
      store.currentStep,
      store.bankAccountHolder,
      store.accountType,
      store.onSetBankAccountHolder,
      store.ownerAccountName,
    ]);

  const setCurrentStep = usePayoutStore((state) => state.setCurrentStep);
  const setOwnerAccountName = usePayoutStore(
    (state) => state.onSetOwnerAccountName
  );
  const setBankAccountHolder = usePayoutStore(
    (store) => store.onSetBankAccountHolder
  );

  const { user } = useAuth();

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const isNextDisabled =
    bankAccountHolder === '' ||
    (bankAccountHolder === 'new-owner' && (!accountType || !ownerAccountName));

  const selectAccountHolder = (e: ChangeEvent<HTMLSelectElement>) => {
    setBankAccountHolder(e.target.value);
    setOwnerAccountName(user?.fullName!);
  };

  return (
    <div className="min-h-[500px] flex flex-col justify-between">
      <div className="w-full max-w-lg mx-auto">
        <h2 className="text-lg font-bold">
          Agrega al titular de la cuenta bancaria
        </h2>
        <p>
          Este es el nombre que aparece en los estados de la cuenta bancaria que
          usarás.
        </p>

        <form className="mt-4">
          <select
            value={bankAccountHolder}
            className="border rounded p-4 w-full"
            onChange={selectAccountHolder}
          >
            <option value="">-- Seleccione una opción --</option>
            <option value="owner">{user?.fullName}</option>
            <option value="new-owner">Nuevo titular del la cuenta</option>
          </select>
        </form>

        {bankAccountHolder === 'new-owner' && <AccountType />}
        {accountType === 'personal' && bankAccountHolder === 'new-owner' ? (
          <FormPersonal />
        ) : null}
        {accountType === 'business' && bankAccountHolder === 'new-owner' ? (
          <FormBusiness />
        ) : null}
      </div>
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className={clsx(
            'bg-cerise-red-600  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          )}
        >
          Anterior
        </button>
        <button
          onClick={nextStep}
          disabled={isNextDisabled}
          className={clsx(
            'bg-cerise-red-600  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
            {
              'bg-cerise-red-200': isNextDisabled,
            }
          )}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

/* 
  const isNextDisabled =
    bankAccountHolder === 'new-owner' &&
    (!accountType || !ownerAccountName.firstName || !ownerAccountName.lastName);
*/
