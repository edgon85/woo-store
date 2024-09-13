'use client';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import { BtnMakeOffer } from '../buttons';
import { IProduct } from '@/interfaces';
import { ProductStatus } from '@/enums';

type Props = {
  isRejected: boolean;
  product: IProduct;
};

export const RejectedProduct = ({ isRejected = false, product }: Props) => {
  const [triggerMakeOffer, setTriggerMakeOffer] = useState(false);

  useEffect(() => {
    if (isRejected) {
      const isAvailable = product.status === ProductStatus.Available;

      Swal.fire({
        title: 'Oferta Rechazada',
        html: isAvailable
          ? 'Lo sentimos, tu oferta para este producto ha sido rechazada.<br>¿Deseas intentarlo de nuevo?'
          : 'Lo sentimos, tu oferta para este producto ha sido rechazada.',
        icon: 'warning',
        showCancelButton: isAvailable,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: isAvailable ? 'Intentar de nuevo' : 'Cerrar',
        cancelButtonText: 'Cerrar',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed && isAvailable) {
          setTriggerMakeOffer(true);
        }
      });
    }
  }, [isRejected, product.status]);

  return (
    <div className="hidden">
      <BtnMakeOffer product={product} triggerOpen={triggerMakeOffer} />;
    </div>
  );
};
