/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Divider } from '@/components/ui';
import { useCheckout } from '@/hooks';
import { IAddress, IProduct } from '@/interfaces';
import { useEffect } from 'react';
import { PlaceOrder } from './PlaceOrder';

type Props = {
  product: IProduct;
  address: IAddress | null;
};

export const OrderBreakdown = ({ product, address }: Props) => {
  const { price } = product;
  const {
    productCheckout,
    onAddCheckoutProduct,
    onSetShippingAddress,
    packageDelivery,
    serviceFee,
    summary,
  } = useCheckout();

  useEffect(() => {
    if (productCheckout === null) {
      onAddCheckoutProduct(product);
    }

    onSetShippingAddress(address!);
  }, []);

  return (
    <section className="bg-white border p-6 rounded shadow-sm">
      <h2 className="text-base">Desglose del pedido</h2>
      <Divider />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p>Precio</p>
          <p>Q{price}.00</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Envío</p>
          <p>Q{packageDelivery?.originalPrice}.00</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Tarifa de servicio</p>
          <p>Q{serviceFee}.00</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Total a pagar</p>
          <p>Q{summary}.00</p>
        </div>
      </div>
      <Divider />
      <PlaceOrder />
    </section>
  );
};
