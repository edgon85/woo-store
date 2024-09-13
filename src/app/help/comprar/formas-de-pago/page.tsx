import { AccordionItem, BuildIcon, CreditCard, TruckIcon } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Formas de pago',
};

export default function FormasDePagoPage() {
  const paymentMethods = [
    {
      id: 'pago-contra-entrega',
      title: 'Pago contra entrega',
      icon: <TruckIcon />,
      content: (
        <div className="mt-2 space-y-2">
          <p>Con el pago contra entrega, pagas cuando recibes tu producto:</p>
          <ul className="list-disc list-inside pl-4">
            <li>
              Realizas el pago directamente al servicio de paquetería al recibir
              tu artículo
            </li>
            <li>
              Tienes 48 horas para hacer cualquier reclamo sobre el producto
            </li>
            <li>
              Si no hay reclamos en 48 horas, la compra se marca como completada
            </li>
          </ul>
          <p className="font-semibold">Ventajas:</p>
          <ul className="list-disc list-inside pl-4">
            <li>Pagas solo cuando tienes el producto en tus manos</li>
            <li>
              No necesitas usar tarjeta de crédito o hacer transferencias por
              adelantado
            </li>
          </ul>
          <p className="text-sm text-gray-600 mt-2">
            Importante: Asegúrate de revisar el producto inmediatamente y hacer
            cualquier reclamo dentro del período de 48 horas.
          </p>
        </div>
      ),
    },
    {
      id: 'transferencia-bancaria',
      title: 'Transferencia bancaria',
      icon: <BuildIcon />,
      content: (
        <div className="mt-2 space-y-2">
          <p>Para pagar mediante transferencia bancaria:</p>
          <ol className="list-decimal list-inside pl-4">
            <li>
              Recibirás un correo electrónico con los datos bancarios para
              realizar la transferencia
            </li>
            <li>Realiza la transferencia desde tu cuenta bancaria</li>
            <li>
              El pago se mantiene seguro hasta que recibas y apruebes el
              artículo
            </li>
          </ol>
          <p className="font-semibold">Ventajas:</p>
          <ul className="list-disc list-inside pl-4">
            <li>Método seguro y sin comisiones adicionales</li>
            <li>Ideal para quienes prefieren no usar tarjetas de crédito</li>
          </ul>
          <p className="text-sm text-gray-600 mt-2">
            Consejo: Guarda el comprobante de tu transferencia por si necesitas
            hacer alguna consulta posterior.
          </p>
        </div>
      ),
    },
    {
      id: 'tarjeta-credito-debito',
      title: 'Tarjeta de crédito o débito',
      icon: <CreditCard />,
      content: (
        <div className="mt-2 space-y-2">
          <p>Pagar con tarjeta de crédito o débito es rápido y seguro:</p>
          <ul className="list-disc list-inside pl-4">
            <li>
              Ingresa los datos de tu tarjeta en nuestra plataforma segura
            </li>
            <li>El pago se procesa inmediatamente</li>
            <li>
              El dinero se mantiene seguro hasta que recibas y apruebes el
              artículo
            </li>
          </ul>
          <p className="font-semibold">Ventajas:</p>
          <ul className="list-disc list-inside pl-4">
            <li>Proceso rápido y conveniente</li>
            <li>
              Protección adicional ofrecida por tu banco o compañía de tarjeta
            </li>
          </ul>
          <p className="text-sm text-gray-600 mt-2">
            Seguridad: Utilizamos encriptación de grado bancario para proteger
            tu información financiera.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">
        Formas de Pago Disponibles
      </h2>
      <p className="mb-6">
        En nuestra plataforma, ofrecemos varias opciones de pago para tu
        comodidad y seguridad. Elige la que mejor se adapte a tus preferencias:
      </p>
      <div className="space-y-4">
        {paymentMethods.map((method, index) => (
          <AccordionItem
            key={method.id}
            id={method.id}
            title={method.title}
            icon={method.icon}
            content={method.content}
          />
        ))}
      </div>
      <p className="mt-6 text-sm text-gray-600">
        Recuerda que todas nuestras opciones de pago están diseñadas para
        proteger tanto al comprador como al vendedor. Si tienes alguna pregunta
        sobre los métodos de pago, no dudes en contactar a nuestro equipo de
        soporte.
      </p>
    </div>
  );
}
