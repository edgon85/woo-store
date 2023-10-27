import { CheckoutContext } from '@/context';
import { useContext } from 'react';

export const useCheckout = () => {
  const { address, loadingAddress, onSetShippingAddress } =
    useContext(CheckoutContext);

  return {
    address,
    loadingAddress,

    /* methods */
    onSetShippingAddress,
  };
};
