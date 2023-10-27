'use client';

import { EditIcon } from '@/components/ui';
import { useCheckout, useLoadingData } from '@/hooks';
import { AddNewAddress } from './AddNewAddress';

export const AddressSection = () => {
  // const { data, loading, errorMessage } = useLoadingData('/shipping-address');
  const { address, loadingAddress } = useCheckout();
/* 
  if (loading) {
    return <p>cargando....</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  } */
  if ( !loadingAddress ) { 
    return <p>cargando....</p>;
  }

  if (address === null) {
    return <AddNewAddress />;
  }

  return (
    <div className="bg-white border p-6 rounded shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Dirección</h2>
        <button>
          <EditIcon />
        </button>
      </div>
      <div className="space-y-2">
        <p className="text-lg">Edwin Hernandez</p>
        <p>2 avenida 4-32, zona 5</p>
        <p>Quetzaltenango, Guatemala</p>
      </div>
    </div>
  );
};
