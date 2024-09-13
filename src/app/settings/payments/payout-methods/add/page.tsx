import { AddPayout, StepOne, StepThree, StepTwo } from '@/components';
import { Metadata } from 'next';

const steps = [
  <>
    <StepOne />
  </>,
  <>
    <StepTwo />
  </>,
  <>
    <StepThree />
  </>,
];

export const metadata: Metadata = {
  title: 'Agregar método de pago',
};

export default function AddPayoutPage() {
  return (
    <div className="min-h-[500px]">
      <AddPayout steps={steps} />
    </div>
  );
}
