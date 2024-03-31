'use client';
import { usePayoutStore } from '@/stores';
import clsx from 'clsx';

import { FormAccountNumber, SelectAccountTypeBank, SelectBank } from './';

export const StepThree = () => {
  const [
    currentStep,
    setCurrentStep,
    bank,
    accountTypeBank,
    bankAccountHolder,
    accountType,
    ownerAccountName,
    accountNumber,
    payoutType,
  ] = usePayoutStore((state) => [
    state.currentStep,
    state.setCurrentStep,
    state.bank,
    state.accountTypeBank,
    state.bankAccountHolder,
    state.accountType,
    state.ownerAccountName,
    state.accountNumber,
    state.payoutType,
  ]);

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onHandleClick = () => {
    // Verificar si hay campos vacíos
    const dataToSend = {
      payoutType,
      bank,
      accountTypeBank,
      bankAccountHolder,
      accountType,
      ownerAccountName,
      accountNumber,
    };

    if (
      bank !== '' &&
      accountTypeBank !== '' &&
      bankAccountHolder !== '' &&
      accountType !== '' &&
      accountNumber !== ''
    ) {
      // Todos los campos están completos, enviar los datos al servidor
      const dataToSend = {
        payoutType,
        bank,
        accountTypeBank,
        bankAccountHolder,
        accountType,
        ownerAccountName,
        accountNumber,
      };

      // Aquí enviar dataToSend al servidor
      console.log('Enviando datos al servidor:', dataToSend);
    } else {
      // Mostrar mensaje de error porque hay campos vacíos
      console.log('Falta completar uno o más campos.');
    }
  };

  return (
    <div className="min-h-[500px] flex flex-col justify-between">
      <div className="w-full max-w-lg mx-auto">
        <SelectBank />

        {bank && <SelectAccountTypeBank />}

        {accountTypeBank && <FormAccountNumber />}
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
          onClick={onHandleClick}
          className={clsx(
            'bg-cerise-red-600  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          )}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};
