import { AccordionItem } from '@/components';
import { Metadata } from 'next';
import { FaBellSlash, FaDownload, FaRegBell, FaTruck } from 'react-icons/fa';
import { GoPackage } from 'react-icons/go';


export const metadata: Metadata = {
  title: 'Como enviar',
}

export default function EnviosPage() {
  const envioSteps = [
    {
      id: 'notificacion-venta',
      title: 'Recibe notificación de venta',
      icon: <FaRegBell className="w-6 h-6" />,
      content: (
        <div className="mt-2 space-y-2">
          <p>
            Cuando alguien compre tu prenda, recibirás una notificación
            inmediata:
          </p>
          <ul className="list-disc list-inside pl-4">
            <li>
              Se te enviará un correo electrónico con los detalles de la venta
            </li>
            <li>
              Recibirás una notificación en la aplicación (si tienes las
              notificaciones activadas)
            </li>
            <li>Podrás ver la venta en tu panel de vendedor</li>
          </ul>
          <p className="text-sm text-gray-600 mt-2">
            Consejo: Mantén tus notificaciones activadas para estar al tanto de
            tus ventas en tiempo real.
          </p>
        </div>
      ),
    },
    {
      id: 'descarga-guia',
      title: 'Descarga la guía de paquetería',
      icon: <FaDownload className="w-6 h-6" />,
      content: (
        <div className="mt-2 space-y-2">
          <p>Para obtener la guía de envío, sigue estos pasos:</p>
          <ol className="list-decimal list-inside pl-4">
            <li>Ve a la sección de &quot;Configuración&quot; en tu cuenta</li>
            <li>Selecciona &quot;Mis ventas&quot;</li>
            <li>Encuentra la venta correspondiente en la lista</li>
            <li>Haz clic en el botón &quot;Descargar guía&quot;</li>
          </ol>
          <p className="text-sm text-gray-600 mt-2">
            Importante: Asegúrate de imprimir la guía en buena calidad para que
            sea legible por la paquetería.
          </p>
        </div>
      ),
    },
    {
      id: 'prepara-empaca',
      title: 'Prepara y empaca el producto',
      icon: <GoPackage className="w-6 h-6" />,
      content: (
        <div className="mt-2 space-y-2">
          <p>Antes de enviar el producto, asegúrate de:</p>
          <ul className="list-disc list-inside pl-4">
            <li>
              Verificar que el artículo esté en las condiciones descritas en la
              venta
            </li>
            <li>Limpiar el artículo si es necesario</li>
            <li>
              Empacarlo de forma segura para evitar daños durante el envío
            </li>
            <li>Usar un empaque adecuado al tamaño y tipo de prenda</li>
          </ul>
          <p className="text-sm text-gray-600 mt-2">
            Consejo: Un empaque cuidadoso ayuda a prevenir problemas y mejora la
            experiencia del comprador.
          </p>
        </div>
      ),
    },
    {
      id: 'envia-paqueteria',
      title: 'Lleva el paquete a la paquetería y envía',
      icon: <FaTruck className="w-6 h-6" />,
      content: (
        <div className="mt-2 space-y-2">
          <p>Para completar el envío:</p>
          <ol className="list-decimal list-inside pl-4">
            <li>
              Identifica la paquetería seleccionada por el comprador en la guía
              de envío
            </li>
            <li>Lleva el paquete a la sucursal de la paquetería indicada</li>
            <li>Presenta la guía que descargaste e imprimiste</li>
            <li>Entrega el paquete al personal de la paquetería</li>
            <li>Guarda el comprobante de envío que te entreguen</li>
          </ol>
          <p className="font-semibold">
            Importante: Asegúrate de enviar el paquete lo antes posible,
            idealmente dentro de las 48 horas siguientes a la venta.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Nota: Algunas paqueterías ofrecen servicio de recolección a
            domicilio. Verifica si esta opción está disponible para ti.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">
        Proceso de Envío para Vendedores
      </h2>
      <p className="mb-6">
        Sigue estos pasos para enviar los productos que has vendido en nuestra
        plataforma:
      </p>
      <div className="space-y-4">
        {envioSteps.map((step) => (
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
        Recuerda que un envío rápido y cuidadoso mejora la satisfacción del
        comprador y aumenta tus posibilidades de recibir buenas valoraciones. Si
        tienes alguna duda sobre el proceso de envío, no dudes en contactar a
        nuestro equipo de soporte.
      </p>
    </div>
  );
}
