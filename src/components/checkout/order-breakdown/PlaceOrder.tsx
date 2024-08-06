import { createNewOrder } from '@/actions';
import { Button, SpinnerIcon } from '@/components/ui';
import { TypeCreateOrder } from '@/types';
import { useCheckoutStore } from '@/stores';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const PlaceOrder = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

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

    setShowLoading(true);

    const { message, ok, data } = await createNewOrder(newOrder);

    if (!ok) {
      toast.error(message);
      setShowLoading(false);
      setError(true);
      console.log(message);
      return;
    } else {
      toast.success('¡Order creada satisfactoriamente!');
      setShowLoading(false);

      router.replace(`checkout/confirm/${data.id}`);
    }
  };

  return (
    <>
      <section className="flex flex-col gap-1 items-center justify-center">
        {/* <Button label="Realizar pedido" type="button" onClick={onHandleClick} /> */}
        {showLoading ? (
          <>
            <div className="flex justify-center items-center">
              <SpinnerIcon className="animate-spin" />
            </div>
          </>
        ) : (
          <Button
            label="Realizar pedido"
            type="button"
            onClick={onHandleClick}
          />
        )}
        {error && <p className="text-red-500">{message}</p>}
      </section>
    </>
  );
};
