'use client';
import { createRatingUser } from '@/actions';
import { RatingState, useRatingStore } from '@/stores/rating.store';
import { useRouter } from 'next/navigation';

import Swal from 'sweetalert2';

type Props = {
  orderId: string;
};

export const BtnActionsRating = ({ orderId }: Props) => {
  const router = useRouter();

  const [
    shippingSpeed,
    accurateDescription,
    sellerCommunication,
    productCleanliness,
    packagePresentation,
    comment,
  ] = useRatingStore((state) => [
    state.shippingSpeed,
    state.accurateDescription,
    state.sellerCommunication,
    state.productCleanliness,
    state.packagePresentation,
    state.comment,
  ]);

  const postRatingData = async () => {
    // Aquí se enviaría la información de la valoración al servidor
    const ratingData = {
      shippingSpeed,
      accurateDescription,
      sellerCommunication,
      productCleanliness,
      packagePresentation,
      comment,
    } as RatingState;

    if (
      shippingSpeed !== 0 &&
      accurateDescription !== 0 &&
      sellerCommunication !== 0 &&
      productCleanliness !== 0 &&
      packagePresentation !== 0 &&
      comment !== ''
    ) {
      // Send ratingData to the server
      const { ok, message, data } = await createRatingUser(ratingData, orderId);

      if (ok) {
        Swal.fire({
          title: '¡Gracias!',
          text: 'Tu valoración ha sido enviada',
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/');
          }
        });
      } else {
        Swal.fire({
          title: '¡Error!',
          text: message,
          icon: 'error',
        });
      }
    } else {
      Swal.fire({
        title: '¡Error!',
        text: 'Seleccione una calificación para cada aspecto y añada un comentario',
        icon: 'error',
      });
      /* console.log(
        'Seleccione una calificación para cada aspecto y añada un comentario'
      ); */
    }
  };

  return (
    <div className="w-full flex gap-4 justify-center items-center">
      <button className="border rounded px-4 py-2 text-cerise-red-600 hover:bg-cerise-red-500 hover:text-white">
        Cancelar
      </button>
      <button
        onClick={postRatingData}
        className="px-4 py-2 rounded bg-cerise-red-600 hover:bg-cerise-red-500 text-white"
      >
        Enviar
      </button>
    </div>
  );
};
