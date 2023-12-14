import { AlertComponent, Button, SpinnerIcon } from '@/components/ui';
import { createOrder } from '@/helpers/httpOrderHelper';
import { useAuth } from '@/hooks';
import { TypeCreateOrder } from '@/lib';
import { useCheckoutStore } from '@/stores';
import { useEffect, useState } from 'react';

export const PlaceOrder = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | ''>('');

  const { user } = useAuth();

  const productCheckout = useCheckoutStore((state) => state.product);
  const paymentMethod = useCheckoutStore((state) => state.paymentMethod);
  const packageDelivery = useCheckoutStore((state) => state.packageDelivery);
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
    if (paymentMethod === null) {
      setError(true);
      setMessage('Seleccione método de pago');
      return;
    }

    if (packageDelivery === null) {
      setError(true);
      setMessage('Seleccione paquetería');
      return;
    }

    const newOrder: TypeCreateOrder = {
      product: productCheckout?.id!,
      shippingAddress: address?.id!,
      paymentMethod: paymentMethod.id,
      amount: amount,
      packageDelivery: packageDelivery.id,
    };

    setShowLoading(true);

    const { message } = await createOrder(newOrder, user?.token!);

    if (message !== 'ok') {
      setError(message);
      setAlertType('error');
      setShowLoading(false);
      console.log(message);
      return;
    } else {
      setAlertType('success');
      setShowLoading(false);
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

      {alertType === 'success' && (
        <AlertComponent
          type="success"
          message="¡Order creada satisfactoriamente!"
          onDismiss={() => setAlertType('')}
        />
      )}
      {alertType === 'error' && (
        <AlertComponent
          type="error"
          message="Ocurrió un error al al crear la orden."
          onDismiss={() => setAlertType('')}
        />
      )}
    </>
  );
};
