import { createNewOrder } from '@/actions';
import { Button, SpinnerIcon } from '@/components/ui';
import { TypeCreateOrder } from '@/types';
import { useCheckoutStore } from '@/stores';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';

export const PlaceOrder = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    product: productCheckout,
    paymentMethod,
    shippingService,
    address,
    computed,
  } = useCheckoutStore();

  const isDisabled = useMemo(() => {
    return !(shippingService && paymentMethod && address);
  }, [address, paymentMethod, shippingService]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const validateOrder = useCallback(() => {
    if (!address) return 'Agregue una dirección de entrega';
    if (!paymentMethod) return 'Seleccione método de pago';
    if (!shippingService) return 'Seleccione paquetería';
    return null;
  }, [address, paymentMethod, shippingService]);

  const handlePlaceOrder = useCallback(async () => {
    const validationError = validateOrder();
    if (validationError) {
      setError(validationError);
      return;
    }

    const newOrder: TypeCreateOrder = {
      productId: productCheckout?.id!,
      shippingAddressId: address?.id!,
      paymentMethod: paymentMethod!.id,
      amount: computed.amount,
      shippingServiceSlug: shippingService!.slug,
      offerId: productCheckout?.offerId,
    };

    setIsLoading(true);

    try {
      const result = await Swal.fire({
        title: '¿Realizar compra?',
        html: 'Se va a crear un nuevo pedido',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, comprar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          const { message, ok, data } = await createNewOrder(newOrder);
          if (!ok) throw new Error(message);
          return data;
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });

      if (result.isConfirmed) {
        await Swal.fire({
          html: '¡Orden creada satisfactoriamente!',
          icon: 'success',
        });
        router.replace(`checkout/confirm/${result.value.id}`);
      }
    } catch (error) {
      Swal.showValidationMessage(`Error: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  }, [
    validateOrder,
    productCheckout,
    address,
    paymentMethod,
    computed.amount,
    shippingService,
    router,
  ]);

  return (
    <section className='flex flex-col gap-1 items-center justify-center'>
      <Button
        type='button'
        onClick={handlePlaceOrder}
        label={isLoading ? '' : 'Realizar pedido'}
        icon={
          isLoading ? (
            <SpinnerIcon className='w-6 h-6 animate-spin text-white' />
          ) : undefined
        }
        disabled={isDisabled || isLoading}
      />
      {error && <p className='text-red-500'>{error}</p>}
    </section>
  );
};
