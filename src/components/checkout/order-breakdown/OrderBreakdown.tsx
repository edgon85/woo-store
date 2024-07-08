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
  const { price, offerPrice } = product;

  const onAddCheckoutProduct = useCheckoutStore((state) => state.setProduct);
  const onSetShippingAddress = useCheckoutStore(
    (state) => state.setShippingAddress
  );
  const packageDelivery = useCheckoutStore((state) => state.packageDelivery);
  const serviceFee = useCheckoutStore((state) => state.serviceFee);
  const amount = useCheckoutStore((state) => state.computed.amount);

  useEffect(() => {
    onAddCheckoutProduct(product);
  }, [product, onAddCheckoutProduct]);

  useEffect(() => {
    if (address) {
      onSetShippingAddress(address);
    }
  }, [address, onSetShippingAddress]);

  return (
    <section className="bg-white border p-6 rounded shadow-sm">
      <h2 className="text-base font-semibold">Desglose del pedido</h2>
      <Divider />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p>Precio</p>
          <div>
            {offerPrice ? (
              <>
                <p className="line-through text-gray-500">
                  {formatCurrency(price * 100)}
                </p>
                <p className="font-semibold">
                  {formatCurrency(offerPrice * 100)}
                </p>
              </>
            ) : (
              <p>{formatCurrency(price * 100)}</p>
            )}
          </div>
        </div>
        {offerPrice && (
          <div className="flex justify-between items-center text-green-600">
            <p>Ahorro</p>
            <p>{formatCurrency((price - offerPrice) * 100)}</p>
          </div>
        )}
        <div className="flex justify-between items-center">
          <p>Envío</p>
          {packageDelivery === null ? (
            <p className="text-yellow-600">Seleccione envío</p>
          ) : (
            <p>{formatCurrency(+packageDelivery.originalPrice * 100)}</p>
          )}
        </div>
        <div className="flex justify-between items-center">
          <p>Tarifa de servicio</p>
          <p>{formatCurrency(serviceFee * 100)}</p>
        </div>
        <div className="flex justify-between items-center font-semibold">
          <strong>Total a pagar</strong>
          <strong>{formatCurrency(amount * 100)}</strong>
        </div>
      </div>
      <Divider />
      <PlaceOrder />
    </section>
  );
};
