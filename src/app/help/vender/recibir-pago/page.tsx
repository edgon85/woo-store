import {
  AccordionItem,
  BuildIcon,
  CircleCheck,
  CreditCard,
  SettingsIcon,
  UserIcon,
} from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recibir pago',
};

export default function RecibirPagoPage() {
  const steps = [
    {
      id: 'ir-a-configuracion',
      title: 'Ir a Configuración, Cobros',
      icon: <SettingsIcon />,
      content: (
        <div className="mt-2 space-y-2">
          <p>
            Para comenzar el proceso de configuración de cobros, sigue estos
            pasos:
          </p>
          <ol className="list-decimal list-inside pl-4">
            <li>Inicia sesión en tu cuenta</li>
            <li>Ve a tu perfil o dashboard</li>
            <li>
              Busca la opción &quot;Configuración&quot; o &quot;Ajustes&quot;
            </li>
            <li>
              Dentro de Configuración, encuentra y selecciona &quot;Cobros&quot;
            </li>
          </ol>
          <p className="text-sm text-gray-600 mt-2">
            Consejo: Asegúrate de tener a mano toda la información bancaria
            necesaria antes de comenzar este proceso.
          </p>
        </div>
      ),
    },
    {
      id: 'agregar-forma-de-cobro',
      title: 'Agregar una forma de cobro',
      icon: <CreditCard />,
      content: (
        <div className="mt-2 space-y-2">
          <p>
            Actualmente, la única forma de cobro disponible es la transferencia
            bancaria.
          </p>
          <p className="font-semibold">
            Importante: Los pagos mediante transferencia bancaria pueden tardar
            de 3 a 7 días hábiles en procesarse.
          </p>
          <p>Para agregar esta forma de cobro:</p>
          <ol className="list-decimal list-inside pl-4">
            <li>Busca el botón &quot;Agregar forma de cobro&quot; o similar</li>
            <li>
              Selecciona &quot;Transferencia bancaria&quot; de las opciones
              disponibles
            </li>
          </ol>
          <p className="text-sm text-gray-600 mt-2">
            Nota: En el futuro, es posible que se añadan más opciones de cobro
            para tu conveniencia.
          </p>
        </div>
      ),
    },
    {
      id: 'agregar el titular de cuenta',
      title: 'Agregar el titular de la cuenta',
      icon: <UserIcon />,
      content: (
        <div className="mt-2 space-y-2">
          <p>
            En este paso, deberás especificar quién es el titular de la cuenta
            bancaria:
          </p>
          <ul className="list-disc list-inside pl-4">
            <li>Si la cuenta es tuya, selecciona la opción correspondiente</li>
            <li>
              Si la cuenta es de otra persona, deberás proporcionar sus datos
            </li>
          </ul>
          <p className="font-semibold">
            Importante: Asegúrate de que tienes permiso para usar la cuenta si
            no es tuya.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Consejo: Por razones de seguridad y facilidad de gestión,
            recomendamos usar tu propia cuenta bancaria siempre que sea posible.
          </p>
        </div>
      ),
    },
    {
      id: 'seleccionar-banco',
      title: 'Seleccionar banco y detalles de la cuenta',
      icon: <BuildIcon />,
      content: (
        <div className="mt-2 space-y-2">
          <p>
            En esta etapa, proporcionarás los detalles específicos de tu cuenta
            bancaria:
          </p>
          <ol className="list-decimal list-inside pl-4">
            <li>Selecciona tu banco de la lista proporcionada</li>
            <li>
              Indica si la cuenta es de ahorro o monetaria (cuenta corriente)
            </li>
            <li>Ingresa el número de cuenta completo</li>
          </ol>
          <p className="font-semibold">
            Asegúrate de ingresar correctamente todos los datos para evitar
            problemas con los pagos.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Consejo: Verifica dos veces el número de cuenta antes de confirmar.
            Un error aquí podría resultar en pagos retrasados o perdidos.
          </p>
        </div>
      ),
    },
    {
      id: 'agregar-esperar-verificacion',
      title: 'Agregar y esperar verificación',
      icon: <CircleCheck />,
      content: (
        <div className="mt-2 space-y-2">
          <p>Una vez que hayas ingresado todos los detalles:</p>
          <ol className="list-decimal list-inside pl-4">
            <li>Revisa cuidadosamente toda la información proporcionada</li>
            <li>
              Haz clic en el botón &quot;Agregar&quot; o &quot;Confirmar&quot;
            </li>
            <li>Espera a que nuestro equipo verifique la información</li>
          </ol>
          <p className="font-semibold">
            El proceso de verificación puede tomar unos días. Te notificaremos
            cuando esté completo.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Nota: Durante el proceso de verificación, es posible que nos
            comuniquemos contigo para solicitar información adicional si es
            necesario.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">
        Cómo configurar tus cobros
      </h2>
      <p className="mb-6">
        Configurar tus cobros es un paso importante para empezar a vender. Sigue
        estas instrucciones para configurar tu método de cobro:
      </p>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <AccordionItem
            key={step.id}
            id={step.id}
            title={step.title}
            icon={step.icon}
            content={step.content}
          />
        ))}
      </div>
      <p className="mt-6 text-sm text-gray-600">
        Recuerda que la configuración correcta de tus cobros es esencial para
        recibir el pago por tus ventas. Si tienes alguna duda durante el
        proceso, no dudes en contactar a nuestro equipo de soporte.
      </p>
    </div>
  );
}
