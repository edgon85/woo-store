'use client';
import { CurrentAddress } from './CurrentAddress';
import { AddressListSection } from './AddressListSection';
import { useCheckoutStore } from '@/stores';

export const AddressSection = () => {
  const address = useCheckoutStore((state) => state.address);

  return (
    <div className='bg-white border p-6 rounded shadow-sm'>
      <div className='flex justify-between items-center'>
        <div>
          <h2 className='text-xl font-bold'>Dirección</h2>
          {!address && (
            <h3 className='text-sm text-gray-500'>Selecciona una dirección</h3>
          )}
        </div>
        <AddressListSection />
      </div>
      <CurrentAddress />
    </div>
  );
};
