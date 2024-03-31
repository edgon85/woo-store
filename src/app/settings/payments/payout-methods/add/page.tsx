import { AddPayout, StepOne, StepThree, StepTwo } from '@/components';

const steps = [
  <>
    <StepOne />
  </>,
  <>
    <StepTwo />
  </>,
  <>
   < StepThree />
  </>,
];

export default function AddPayoutPage() {
  return (
    <div className="min-h-[500px]">
      <AddPayout steps={steps} />
    </div>
  );
}
