'use client';
import clsx from 'clsx';
import React from 'react';
import { CiBank, CiWallet } from 'react-icons/ci';
import { RadiaSelectIcon } from '../ui';

import { usePayoutStore } from '@/stores';

export const StepOne = () => {
  const payoutType = usePayoutStore((store) => store.payoutType);
  const setPayoutType = usePayoutStore((store) => store.onPayoutType);
  const [currentStep, setCurrentStep] = usePayoutStore((state) => [
    state.currentStep,
    state.setCurrentStep,
  ]);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="min-h-[500px] flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-bold">Agrega una forma de cobro</h2>
        <p>Para empezar, dinos a dónde quieres que te enviemos tu dinero.</p>

        <div
          className={clsx('border w-5/12 rounded-md mt-4 cursor-pointer', {
            'border-cerise-red-600': payoutType === 'bank',
          })}
          onClick={() => setPayoutType('bank')}
        >
          <div className="flex items-center px-2 py-4 gap-2">
            <CiBank size={24} />
            <div className="flex justify-between w-full items-center">
              <div>
                <p>Trasferencia bancaria</p>
                <p>· 3 a 7 días hábiles</p>
              </div>
              {payoutType === 'bank' && (
                <RadiaSelectIcon size="16" className="text-cerise-red-600" />
              )}
            </div>
          </div>
        </div>
        <div
          className={clsx('border w-5/12 rounded-md mt-4 cursor-pointer', {
            'border-cerise-red-600': payoutType === 'fri',
          })}
          onClick={() => setPayoutType('fri')}
        >
          <div className="flex items-center px-2 py-4 gap-2">
            <CiWallet size={24} />
            <div className="flex justify-between w-full items-center">
              <div>
                <p>Fri Billetera Electrónica</p>
                <p>· 1 día hábil</p>
              </div>
              {payoutType === 'fri' && (
                <RadiaSelectIcon size="16" className="text-cerise-red-600" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={nextStep}
          disabled={!payoutType}
          className={clsx(
            'bg-cerise-red-600  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
            {
              'bg-cerise-red-200': payoutType === '',
            }
          )}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};