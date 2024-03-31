'use client';
import { usePayoutStore } from '@/stores';

type Props = {
  steps: JSX.Element[];
};

export const AddPayout = ({ steps }: Props) => {
  const [currentStep] = usePayoutStore((state) => [
    state.currentStep,
    state.setCurrentStep,
  ]);

  return (
    <div className="w-full">
      <div className="bg-white px-8 pt-6 pb-8 min-h-[500px] flex flex-col justify-between">
        {steps[currentStep]}
      </div>
    </div>
  );
};
