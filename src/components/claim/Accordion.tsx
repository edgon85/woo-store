'use client';
import Link from 'next/link';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionList,
} from '@tremor/react';
import { IOrder } from '@/interfaces';
import { OrderStatus } from '@/enums';
import { FormClaim } from './FormClaim';
import { useSearchParams, useRouter } from 'next/navigation';

type Props = {
  order: IOrder;
};

export const AccordionComponent = ({ order }: Props) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const onHandleTabReturnProduct = () => {
    const params = new URLSearchParams(searchParams);
    params.set('reason', 'return_the_product');

    replace(`/claim/open?${params.toString()}`);
  };

  const onHandleTabProductNotReceived = () => {
    const params = new URLSearchParams(searchParams);
    params.set('reason', 'product_not_received');

    replace(`/claim/open?${params.toString()}`);
  };

  return (
    <AccordionList>
      {order.orderStatus !== OrderStatus.Completed ? (
        <Accordion
          className="rounded-t"
          onClick={onHandleTabProductNotReceived}
        >
          <AccordionHeader className="text-sm font-medium text-tremor-content-strong">
            No me ha llegado el producto
          </AccordionHeader>
          <AccordionBody className="leading-6 border-t pt-2 pb-2">
            {order.orderStatus === OrderStatus.OrderPlaced ? (
              <p>
                Tu vendedor ya fue notificado. Recuerda que tiene 7 días hábiles
                para enviar tu prenda por {order.packageDelivery.name}.
              </p>
            ) : null}

            {order.orderStatus === OrderStatus.SellerNotified ? (
              <p>
                Tu vendedor ya a enviado el producto y pronto te llegara ver en{' '}
                <Link
                  className="text-cerise-red-600"
                  href={`/`}
                  target="_blank"
                >
                  {order.packageDelivery.name}
                </Link>
              </p>
            ) : null}

            {order.orderStatus === OrderStatus.InTransit ? (
              <p>
                Tu pedido ya esta en camino puedes dar seguimiento en{' '}
                <Link
                  className="text-cerise-red-600"
                  href={`/`}
                  target="_blank"
                >
                  {order.packageDelivery.name}
                </Link>
              </p>
            ) : null}
            <p>
              Si tu pedido lleva más de 72 horas sin cambiar de estado, por
              favor comunícate con{' '}
              <Link className="text-cerise-red-600" href={'/'}>
                Servicio al cliente
              </Link>
            </p>
          </AccordionBody>
        </Accordion>
      ) : (
        <div className="border-t"></div>
      )}

      {order.orderStatus === OrderStatus.Completed ? (
        <Accordion className="rounded-t" onClick={onHandleTabReturnProduct}>
          <AccordionHeader className="text-sm font-medium text-tremor-content-strong">
            Ya recibiste el producto
          </AccordionHeader>

          {order.claim ? (
            <AccordionBody className="leading-6 border-t pt-2 pb-2">
              <p>
                {' '}
                <span className="font-bold">
                  {' '}
                  Tú reclamo esta en revision:
                </span>{' '}
                <span className="text-xs">
                  Revisaremos tu solicitud y te responderemos en un plazo de
                  entre 1 y 4 días hábiles
                </span>
              </p>
            </AccordionBody>
          ) : (
            <AccordionBody className="leading-6 border-t pt-2 pb-2">
              <p>No es lo que esperabas? Quiero devolver el producto.</p>
              <FormClaim orderId={order.id} />
            </AccordionBody>
          )}
        </Accordion>
      ) : (
        <div className="border-t"></div>
      )}
    </AccordionList>
  );
};
