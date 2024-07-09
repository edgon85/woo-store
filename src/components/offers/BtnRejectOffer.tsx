'use client';

import { rejectOffer } from '@/actions';
import { IOffer } from '@/interfaces';
import { formatCurrency } from '@/utils';
import Swal from 'sweetalert2';

type Props = {
  offer: IOffer;
};

export const BtnRejectOffer = ({ offer }: Props) => {
  const handleReject = async () => {
    Swal.fire({
      title: 'Rechazar oferta',
      text: `¿Estás seguro de rechazar la oferta? de ${formatCurrency(
        offer.price * 100
      )}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: async (_) => {
        const data = await rejectOffer(offer.id);

        if (!data.ok) {
          Swal.showValidationMessage(`Error: ${data.message}`);
        }

        return data;
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (result.value?.ok) {
          Swal.fire({
            title: 'Oferta Rechazada',
            text: 'La oferta ha sido rechazada',
            icon: 'success',
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al aceptar la oferta',
            icon: 'error',
          });
        }
      }
    });
  };

  return (
    <button
      onClick={handleReject}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm transition duration-300"
    >
      Rechazar
    </button>
  );
};
