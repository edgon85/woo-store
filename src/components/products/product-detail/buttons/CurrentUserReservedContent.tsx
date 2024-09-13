import { useIsClient, useCountdown } from '@/hooks';

import { IProduct } from '@/interfaces';
import Link from 'next/link';
import React from 'react';

export const CurrentUserReservedContent = ({
  product,
  isPendingPayment,
}: {
  product: IProduct;
  isPendingPayment: boolean;
}) => {
  const isClient = useIsClient();
  const { hours, minutes, isExpired } = useCountdown(
    product.offer?.acceptedAt || ''
  );

  if (isPendingPayment) {
    return (
      <p className='text-center text-sm text-green-600 mb-4'>
        Ya has comprado este producto
      </p>
    );
  }

  if (!isClient) {
    return (
      <p className='text-center text-sm text-green-600 mb-4'>
        Este producto está reservado para ti
      </p>
    );
  }

  if (isExpired) {
    return (
      <p className='text-center text-sm text-red-600 mb-4'>
        El tiempo de reserva ha expirado
      </p>
    );
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <p className='text-center text-sm text-green-600 mb-2'>
        Este producto está reservado para ti
      </p>
      <p className='text-center text-sm text-green-600 mb-4'>
        Tienes{' '}
        <strong>
          {hours}h {minutes}min
        </strong>{' '}
        para realizar la compra
      </p>
      <Link
        href={`/checkout?transaction=${product.id}&offer=true`}
        className='w-full bg-cerise-red-600 hover:bg-cerise-red-500 text-white text-sm rounded flex justify-center items-center px-4 py-2'
      >
        Comprar ahora
      </Link>
    </div>
  );
};
