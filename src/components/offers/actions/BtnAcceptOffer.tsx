'use client';
import { acceptOffer } from '@/actions';
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
      showLoaderOnConfirm: true,
      preConfirm: async (_) => {
        const data = await acceptOffer(offer.id);

        if (!data.ok) {
          Swal.showValidationMessage(`Error: ${data.message}`);
        }

        return data;
      },
    }).then(async (result) => {
      if (result.isConfirmed) {

        if (result.value?.ok) {
          Swal.fire({
            title: 'Oferta aceptada',
            text: 'La oferta ha sido aceptada con éxito',
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
      onClick={handleAccept}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-sm transition duration-300"
    >
      Aceptar
    </button>
  );
};
