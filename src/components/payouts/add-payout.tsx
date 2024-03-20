'use client';
import { usePayoutStore } from '@/stores';
import clsx from 'clsx';
import { useState } from 'react';

type Props = {
  steps: JSX.Element[];
};

export const AddPayout = ({ steps }: Props) => {
  // const [currentStep, setCurrentStep] = useState(0);
  // const [currentStep, setCurrentStep] = useState(0);
  const [currentStep, setCurrentStep] = usePayoutStore((state) => [
    state.currentStep,
    state.setCurrentStep,
  ]);
  const payoutType = usePayoutStore((store) => store.payoutType);
  const bankAccountHolder = usePayoutStore((store) => store.bankAccountHolder);
  const accountType = usePayoutStore((store) => store.accountType);
  const ownerAccountName = usePayoutStore((store) => store.ownerAccountName);
  const resetStep1 = usePayoutStore((store) => store.resetStepOne);
  const resetStep2 = usePayoutStore((store) => store.resetStepTwo);

  // const isNextDisabled = payoutType === '';
  /*   const isNextDisabled =
    bankAccountHolder === 'new-owner' &&
    (!accountType || !ownerAccountName.firstName || !ownerAccountName.lastName); */
  const [isValidStep1, setIsValidStep1] = useState(false);
  const [isValidStep2, setIsValidStep2] = useState(false);

  const nextStep = () => {
    if (currentStep === 0 && payoutType) {
      setIsValidStep1(true);
    }

    if (currentStep === 1 && isValidStep2) {
      setIsValidStep2(true);
    }

    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="w-full">
      <div className="bg-white px-8 pt-6 pb-8 min-h-[500px] flex flex-col justify-between">
        {steps[currentStep]}

        {/*        <div className="flex justify-between ">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={clsx(
              'bg-cerise-red-600  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
              {
                'bg-cerise-red-200': currentStep === 0,
                'hover:bg-cerise-red-500': currentStep !== 0,
              }
            )}
          >
            Anterior
          </button>
          <button
            onClick={nextStep}
            disabled={currentStep === 0 ? !payoutType : !isValidStep2}
            className={clsx(
              'bg-cerise-red-600  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
              {
                'bg-cerise-red-200': payoutType === '',
              }
            )}
          >
            Siguiente
          </button>
        </div> */}
      </div>
    </div>
  );
};
