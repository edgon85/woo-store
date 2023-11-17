import { Button } from '@/components/ui';
import { useAuth, useCheckout } from '@/hooks';
import { useEffect, useState } from 'react';

export const PlaceOrder = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const { user } = useAuth();
  const { productCheckout, serviceFee, paymentMethod, packageDelivery } =
    useCheckout();

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

  const onHandleClick = () => {
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

    console.log('todo ok');
  };

  return (
    <section className="flex flex-col gap-1 items-center justify-center">
      <Button label="Realizar pedido" type="button" onClick={onHandleClick} />
      {error && <p className="text-red-500">{message}</p>}
    </section>
  );
};
