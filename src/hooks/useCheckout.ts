import { CheckoutContext } from '@/context';
import { useContext } from 'react';

export const useCheckout = () => {
  const {
    serviceFee,
    address,
    paymentMethod,
    packageDelivery,
    product: productCheckout,
    onSetShippingAddress,
    onAddCheckoutProduct,
    onSetPaymentMethod,
    onSetPackageDelivery,
  } = useContext(CheckoutContext);

  const price = Number(productCheckout?.price);
  const delivery = Number(packageDelivery?.originalPrice) || 0;
  const service = Number(serviceFee);
  const amount = price + delivery + service;

  return {
    address,
    serviceFee,
    paymentMethod,
    productCheckout,
    packageDelivery,
    amount,

    /* methods */
    onSetShippingAddress,
    onAddCheckoutProduct,
    onSetPaymentMethod,
    onSetPackageDelivery,
  };
};
