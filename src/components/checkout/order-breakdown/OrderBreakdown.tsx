'use client';

import { Divider } from '@/components/ui';
import { IAddress, IProductWithOffer } from '@/interfaces';
import { useEffect } from 'react';
import { PlaceOrder } from './PlaceOrder';
import { useCheckoutStore } from '@/stores';
import { formatCurrency } from '@/utils';

type Props = {
  product: IProductWithOffer;
  address: IAddress | null;
};

export const OrderBreakdown = ({ product, address }: Props) => {
  const { price, offerPrice, isShippingIncluded } = product;
  const {
    setProduct,
    setShippingAddress,
    shippingService,
    serviceFee,
    computed: { amount },
  } = useCheckoutStore();

  useEffect(() => {
    setProduct(product);
  }, [product, setProduct]);

  useEffect(() => {
    if (address) {
      setShippingAddress(address);
    }
  }, [address, setShippingAddress]);

  const renderPrice = () => (
    <div className="flex justify-between items-center">
      <p>Precio</p>
      <div>
        {offerPrice ? (
          <>
            <p className="line-through text-gray-500">
              {formatCurrency(price * 100)}
            </p>
            <p className="font-semibold">{formatCurrency(offerPrice * 100)}</p>
          </>
        ) : (
          <p>{formatCurrency(price * 100)}</p>
        )}
      </div>
    </div>
  );

  const renderSavings = () => {
    if (!offerPrice) return null;
    return (
      <div className="flex justify-between items-center text-green-600">
        <p>Ahorro</p>
        <p>{formatCurrency((price - offerPrice) * 100)}</p>
      </div>
    );
  };

  const renderShipping = () => {
    if (!shippingService) {
      return <p className="text-yellow-600">Seleccione envío</p>;
    }

    if (isShippingIncluded) {
      return (
        <>
          <span className="text-green-600 font-medium">Envío Gratis</span>
        </>
      );
    }

    const showDiscount =
      shippingService.discountedPrice !== 0 &&
      shippingService.discountedPrice < shippingService.regularPrice;

    return (
      <>
        {showDiscount && (
          <>
            <span className="ml-2 line-through text-gray-500">
              {formatCurrency(shippingService.regularPrice * 100)}
            </span>
          </>
        )}
        <span>
          {showDiscount
            ? formatCurrency(shippingService.discountedPrice * 100)
            : formatCurrency(shippingService.regularPrice * 100)}
        </span>
      </>
    );
  };

  return (
    <section className="bg-white border p-6 rounded shadow-sm">
      <h2 className="text-base font-semibold">Desglose del pedido</h2>
      <Divider />
      <div className="flex flex-col gap-4">
        {renderPrice()}
        {renderSavings()}
        <div className="flex justify-between items-center">
          <p>Envío</p>
          {renderShipping()}
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
