/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Divider } from '@/components/ui';
import { IAddress, IProductWithOffer } from '@/interfaces';
import { useEffect } from 'react';
import { PlaceOrder } from './PlaceOrder';
import { useCheckoutStore } from '@/stores';
import { formatCurrency } from '@/lib';

type Props = {
  product: IProductWithOffer;
  address: IAddress | null;
};

export const OrderBreakdown = ({ product, address }: Props) => {
  const { price } = product;

  const productCheckout = useCheckoutStore((state) => state.product);
  const onAddCheckoutProduct = useCheckoutStore((state) => state.setProduct);
  const onSetShippingAddress = useCheckoutStore(
    (state) => state.setShippingAddress
  );
  const packageDelivery = useCheckoutStore((state) => state.packageDelivery);
  const serviceFee = useCheckoutStore((state) => state.serviceFee);
  const amount = useCheckoutStore((state) => state.computed.amount);

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
          <p>{formatCurrency(price * 100)}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Envío</p>
          {packageDelivery === null ? (
            <p>seleccione envío</p>
          ) : (
            <p>{formatCurrency(+packageDelivery?.originalPrice * 100)}</p>
          )}
        </div>
        <div className="flex justify-between items-center">
          <p>Tarifa de servicio</p>
          <p>{formatCurrency(serviceFee * 100)}</p>
        </div>
        {packageDelivery !== null && (
          <div className="flex justify-between items-center">
            <p>Total a pagar</p>
            <p>{formatCurrency(amount * 100)}</p>
          </div>
        )}
      </div>
      <Divider />
      <PlaceOrder />
    </section>
  );
};
