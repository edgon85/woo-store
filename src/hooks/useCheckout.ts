import { CheckoutContext } from '@/context';
import { useContext } from 'react';

export const useCheckout = () => {
  const {
    address,
    loadingAddress,
    product: productCheckout,
    onSetShippingAddress,
    onAddCheckoutProduct,
  } = useContext(CheckoutContext);

  return {
    address,
    loadingAddress,
    productCheckout,

    /* methods */
    onSetShippingAddress,
    onAddCheckoutProduct,
  };
};
