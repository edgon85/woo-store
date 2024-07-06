'use client';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { BtnMakeOffer } from '../buttons/BtnMakeOffer';
import { IProduct } from '@/interfaces';

type Props = {
  isRejected: boolean;
  product: IProduct;
};

export const RejectedProduct = ({ isRejected = false, product }: Props) => {
  const [triggerMakeOffer, setTriggerMakeOffer] = useState(false);

  useEffect(() => {
    if (isRejected) {
      Swal.fire({
        title: 'Oferta Rechazada',
        html: 'Lo sentimos, tu oferta para este producto ha sido rechazada.<br>¿Deseas intentarlo de nuevo?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Intentar de nuevo',
        cancelButtonText: 'Cerrar',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          setTriggerMakeOffer(true);
        }
      });
    }
  }, [isRejected]);

  return <BtnMakeOffer product={product} triggerOpen={triggerMakeOffer} />;
};
