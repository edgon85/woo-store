import { AddPayout, StepOne, StepTwo } from '@/components';

const steps = [
  <>
    <StepOne />
  </>,
  <>
    <StepTwo />
  </>,
  <>
    <h2>paso 3</h2>
  </>,
];

export default function AddPayoutPage() {
  return (
    <div className="min-h-[500px]">
      <AddPayout steps={steps} />
    </div>
  );
}
