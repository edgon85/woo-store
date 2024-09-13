import { createNewOrder } from '@/actions';
import { Button, SpinnerIcon } from '@/components/ui';
import { TypeCreateOrder } from '@/types';
import { useCheckoutStore } from '@/stores';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export const PlaceOrder = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const router = useRouter();

  const productCheckout = useCheckoutStore((state) => state.product);
  const paymentMethod = useCheckoutStore((state) => state.paymentMethod);
  const shippingService = useCheckoutStore((state) => state.shippingService);
  const address = useCheckoutStore((state) => state.address);
  const amount = useCheckoutStore((state) => state.computed.amount);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (error) {
      timer = setTimeout(() => {
        setError(false);
        setMessage('');
      }, 3000);
    }

    return () => clearTimeout(timer); // Limpia el temporizador cuando el componente se desmonta
  }, [error]);

  const onHandleClick = async () => {
    if (address === null) {
      setError(true);
      setMessage('Agregue una dirección de entrega');
      return;
    }

    if (paymentMethod === null) {
      setError(true);
      setMessage('Seleccione método de pago');
      return;
    }

    if (shippingService === null) {
      setError(true);
      setMessage('Seleccione paquetería');
      return;
    }

    const newOrder: TypeCreateOrder = {
      productId: productCheckout?.id!,
      shippingAddressId: address?.id!,
      paymentMethod: paymentMethod.id,
      amount: amount,
      shippingServiceSlug: shippingService.slug,
      offerId: productCheckout?.offerId,
    };

    setIsLoading(true);
    Swal.fire({
      title: '¿Realizar compra?',
      html: `Se va a crear un nuevo pedido`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, comprar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,

      preConfirm: async () => {
        const { message, ok, data } = await createNewOrder(newOrder);

        if (!ok) {
          Swal.showValidationMessage(`error: ${message}`);
          return;
        }
        return data;
      },

      allowOutsideClick: () => {
        const popup = Swal.getPopup() as HTMLElement;
        popup.classList.remove('swal2-show');
        setIsLoading(false);
        return !Swal.isLoading();
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(false);
        Swal.fire({
          html: '<p>¡Order creada satisfactoriamente!</p>',
          icon: 'success',
        });

        setDisabled(true);
        router.replace(`checkout/confirm/${result.value.id}`);
      } else if (result.dismiss) {
        setIsLoading(false);
      }
    });
  };

  return (
    <>
      <section className="flex flex-col gap-1 items-center justify-center">
        <Button
          type="button"
          onClick={onHandleClick}
          label={isLoading ? '' : 'Realizar pedido'}
          icon={
            isLoading ? (
              <SpinnerIcon className="w-6 h-6 animate-spin text-white" />
            ) : (
              <></>
            )
          }
          disabled={disabled}
        />
        {error && <p className="text-red-500">{message}</p>}
      </section>
    </>
  );
};
