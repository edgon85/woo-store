'use client';

import { useCheckout } from '@/hooks';

import { AddNewAddress } from './AddNewAddress';
import { CurrentAddress } from './CurrentAddress';

export const AddressSection = () => {
  const { address, loadingAddress } = useCheckout();

  if (!loadingAddress) {
    return <p>cargando....</p>;
  }

  if (address === null) {
    return <AddNewAddress />;
  }

  return <CurrentAddress />;
};
