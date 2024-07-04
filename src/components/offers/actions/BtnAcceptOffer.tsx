'use client';
import { IOffer } from '@/interfaces';
import { formatCurrency } from '@/utils';
import Swal from 'sweetalert2';

type Props = {
  offer: IOffer;
};

export const BtnAcceptOffer = ({ offer }: Props) => {
  const handleAccept = async () => {
    Swal.fire({
      title: 'Aceptar oferta',
      text: `¿Estás seguro de aceptar la oferta? de ${formatCurrency(
        offer.price * 100
      )}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log('Aceptar oferta');
      }
    });
  };

  return (
    <button
      onClick={handleAccept}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-sm transition duration-300"
    >
      Aceptar
    </button>
  );
};
