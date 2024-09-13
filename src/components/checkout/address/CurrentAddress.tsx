'use client';

import { useCheckoutStore } from '@/stores';

export const CurrentAddress = () => {
  const address = useCheckoutStore((state) => state.address);

  if (address === null) {
    return <></>;
  }

  return (
    <>
      <div className="bg-white border p-6 rounded shadow-sm">
        <div className="space-y-2">
          <p className="text-lg">{address.fullName}</p>
          <p className="flex flex-col md:flex-row gap-1">
            <span>{address.streetAddress}</span>
            <span>
              {address.municipality.name}, {address.department.name}
            </span>
          </p>
          <p>
            <span>+502 </span>
            {address.phone}
          </p>
        </div>
      </div>
    </>
  );
};
