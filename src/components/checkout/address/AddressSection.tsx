'use client';

import { useCheckout } from '@/hooks';

import { AddNewAddress } from './AddNewAddress';
import { CurrentAddress } from './CurrentAddress';
import { IAddress } from '@/interfaces';

type Props = {
  addresses: IAddress[];
};

export const AddressSection = ({ addresses }: Props) => {
  // const { address, loadingAddress } = useCheckout();

  /*   if (!loadingAddress) {
    return <p>cargando....</p>;
  } */

  if (addresses.length === 0) {
    return <AddNewAddress />;
  }

  const current = addresses.find((address) => address.isPrimary);

  return <CurrentAddress currentAddress={current!} />;
};
