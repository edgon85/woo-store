'use client';
import Link from 'next/link';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionList,
} from '@tremor/react';
import { IOrder, OrderStatus } from '@/lib';
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
      {order.orderStatus !== OrderStatus.Delivered ? (
        <Accordion
          className="rounded-t"
          onClick={onHandleTabProductNotReceived}
        >
          <AccordionHeader className="text-sm font-medium text-tremor-content-strong">
            No me ha llegado el producto
          </AccordionHeader>
          <AccordionBody className="leading-6 border-t pt-2 pb-2">
            {order.orderStatus === OrderStatus.Initiated ? (
              <p>
                Tu vendedor ya fue notificado. Recuerda que tiene 7 días hábiles
                para enviar tu prenda por {order.packageDelivery.name}.
              </p>
            ) : null}

            {order.orderStatus === OrderStatus.Shipped ? (
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

            {order.orderStatus === OrderStatus.OutForDelivery ? (
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

      {order.orderStatus === OrderStatus.Delivered ? (
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

/* 
import { useState } from 'react';
import { AccordionItem } from './AccordionItem';

export const Accordion = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const toggleAccordion = (accordionId: number) => {
    setActiveAccordion(activeAccordion === accordionId ? null : accordionId);
  };

  return (
    <div id="accordion-collapse" data-accordion="collapse">
      <AccordionItem
        index={1}
        heading="No me ha llegado el producto"
        isActive={activeAccordion === 1}
        toggleAccordion={toggleAccordion}
      >
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          Flowbite is an open-source library of interactive components built on
          top of Tailwind CSS including buttons, dropdowns, modals, navbars, and
          more.
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Check out this guide to learn how to{' '}
          <a
            href="/docs/getting-started/introduction/"
            className="text-blue-600 dark:text-blue-500 hover:underline"
          >
            get started
          </a>{' '}
          and start developing websites even faster with components on top of
          Tailwind CSS.
        </p>
      </AccordionItem>
      <AccordionItem
        index={2}
        heading="Is there a Figma file available?"
        isActive={activeAccordion === 2}
        toggleAccordion={toggleAccordion}
      >
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          Flowbite is first conceptualized and designed using the Figma software
          so everything you see in the library has a design equivalent in our
          Figma file.
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Check out the{' '}
          <a
            href="https://flowbite.com/figma/"
            className="text-blue-600 dark:text-blue-500 hover:underline"
          >
            Figma design system
          </a>{' '}
          based on the utility classes from Tailwind CSS and components from
          Flowbite.
        </p>
      </AccordionItem>
      <AccordionItem
        index={3}
        heading="What are the differences between Flowbite and Tailwind UI?"
        isActive={activeAccordion === 3}
        toggleAccordion={toggleAccordion}
      >
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          The main difference is that the core components from Flowbite are open
          source under the MIT license, whereas Tailwind UI is a paid product.
          Another difference is that Flowbite relies on smaller and standalone
          components, whereas Tailwind UI offers sections of pages.
        </p>
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          However, we actually recommend using both Flowbite, Flowbite Pro, and
          even Tailwind UI as there is no technical reason stopping you from
          using the best of two worlds.
        </p>
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          Learn more about these technologies:
        </p>
        <ul className="ps-5 text-gray-500 list-disc dark:text-gray-400">
          <li>
            <a
              href="https://flowbite.com/pro/"
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              Flowbite Pro
            </a>
          </li>
          <li>
            <a
              href="https://tailwindui.com/"
              rel="nofollow"
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              Tailwind UI
            </a>
          </li>
        </ul>
      </AccordionItem>
    </div>
  );
};
 */
