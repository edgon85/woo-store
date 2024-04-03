'use client';
import { usePayoutStore } from '@/stores';
import clsx from 'clsx';

import { FormAccountNumber, SelectAccountTypeBank, SelectBank } from './';
import Swal from 'sweetalert2';
import { addPayoutMethod } from '@/actions';
import { useRouter } from 'next/navigation';

export const StepThree = () => {
  const router = useRouter();

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

      Swal.fire({
        title: 'Se creara la cuenta',
        //text: `${ownerAccountName} - ${bank} - ${accountNumber}`,
        icon: 'info',
        html: `<span>${ownerAccountName}</span></br>
        <span>${bank} - ${accountTypeBank}</span></br><span>${accountNumber}</span>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, Agregar!',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,

        preConfirm: async () => {
          const { ok, message } = await addPayoutMethod(dataToSend);

          if (!ok) {
            Swal.showValidationMessage(`error: ${message}`);
            return;
          }

          return 'todo ok';
        },
        allowOutsideClick: () => {
          const popup = Swal.getPopup() as HTMLElement;
          popup.classList.remove('swal2-show');
          return !Swal.isLoading();
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (result.value === 'todo ok') {
            router.replace('/settings/payments/payout-methods');
          }
        }
      });
    } else {
      console.log('Ocurrió un error.');
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
