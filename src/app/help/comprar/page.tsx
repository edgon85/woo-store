import {
  AccordionItem,
  CreditCard,
  EyeDropIcon,
  FillStarIcon,
  MessagesIcon,
  OfferIcon,
  SearchIcon,
  SpinnerIcon,
} from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Como Comprar',
};

export default function ComprarPage() {
  const steps = [
    {
      id: 'buscar-articulos',
      title: 'Buscar artículos',
      icon: <SearchIcon />,
      content: (
        <div className="mt-2 space-y-2">
          <p>
            Empieza tu experiencia de compra buscando el artículo que deseas:
          </p>
          <ul className="list-disc list-inside pl-4">
            <li>
              Utiliza la barra de búsqueda en la parte superior de la página
            </li>
            <li>
              Navega entre los géneros y tipo de prenda, aplica filtros para
              refinar tu búsqueda (categoría, talla, marca, etc.)
            </li>
            <li>
              Explora las categorías populares o las colecciones destacadas
            </li>
          </ul>
          <p className="text-sm text-gray-600 mt-2">
            Consejo: Usa palabras clave específicas para encontrar exactamente
            lo que buscas.
          </p>
        </div>
      ),
    },
    {
      id: 'revisar-detalles-del-articulo',
      title: 'Revisar detalles del artículo',
      icon: <EyeDropIcon className="w-6 h-6" />,
      content: (
        <div className="mt-2 space-y-2">
          <p>Una vez que encuentres un artículo interesante:</p>
          <ul className="list-disc list-inside pl-4">
            <li>Examina todas las fotos detenidamente</li>
            <li>Lee la descripción completa del artículo</li>
            <li>Verifica el estado del artículo (nuevo, usado, etc.)</li>
            <li>Revisa las medidas y tallas proporcionadas</li>
            <li>Comprueba el precio y puedes ofertar por la prenda</li>
          </ul>
          <p className="text-sm text-gray-600 mt-2">
            Consejo: No dudes en pedir más información si lo necesitas.
          </p>
        </div>
      ),
    },
    {
      id: 'comunicarse-con-el-vendedor',
      title: 'Comunicarse con el vendedor',
      icon: <MessagesIcon />,
      content: (
        <div className="mt-2 space-y-2">
          <p>Si tienes preguntas o necesitas más información:</p>
          <ul className="list-disc list-inside pl-4">
            <li>Utiliza la función de mensajes de la plataforma</li>
            <li>Haz preguntas específicas sobre el artículo</li>

            {/* <li>Consulta sobre posibles descuentos o envíos combinados</li> */}
          </ul>
          <p className="font-semibold">
            Importante: Toda la comunicación debe mantenerse dentro de la
            plataforma para tu seguridad.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Consejo: Sé cortés y paciente. Los vendedores suelen responder en un
            plazo de 24-48 horas.
          </p>
        </div>
      ),
    },
    {
      id: 'hacer-una-oferta',
      title: 'Hacer una oferta',
      icon: <OfferIcon />,
      content: (
        <div className="mt-2 space-y-2">
          <p>Puedes ofertar por la prenda:</p>
          <ul className="list-disc list-inside pl-4">
            <li>Haz clic en el botón &quot;hacer oferta&quot;</li>
            <li>Selecciona un rango de precio disponible a ofertar</li>
            <li>Envía tu oferta</li>
            <li>
              Si tu oferta es aceptada, el articulo solo estará disponible para
              tí
            </li>
            <li>
              Tienes 24h para realizar la compra, de lo contrario el articulo
              estará disponible para todos nuevamente
            </li>
            <li>
              Si tu oferta es rechazada, podrás volver a ofertar con un precio
              diferente
            </li>
          </ul>

          <p className="text-sm text-gray-600 mt-2">
            Consejo: Sé cortés y paciente. Los vendedores suelen responder en un
            plazo de 24-48 horas.
          </p>
        </div>
      ),
    },
    {
      id: 'realizar-la-compra',
      title: 'Realizar la compra',
      icon: <CreditCard />,
      content: (
        <div className="mt-2 space-y-2">
          <p>Cuando estés listo para comprar:</p>
          <ol className="list-decimal list-inside pl-4">
            <li>Haz clic en el botón &quot;Comprar&quot;</li>
            <li>Introduce la información de envío si es necesario</li>
            <li>Selecciona tu método de pago preferido</li>
            <li>Selecciona tu una paquetería si hay más de una disponible</li>
            <li>Confirma y envía tu orden</li>
          </ol>
          {/* <p className="font-semibold">
            Nota: Tu pago se mantiene seguro hasta que recibas y apruebes el
            artículo.
          </p> */}
          <p className="text-sm text-gray-600 mt-2">
            Consejo: Verifica que toda la información sea correcta antes de
            finalizar la compra.
          </p>
        </div>
      ),
    },
    {
      id: 'recibir-el-articulo',
      title: 'Recibir el artículo',
      icon: <SpinnerIcon />,
      content: (
        <div className="mt-2 space-y-2">
          <p>Después de confirmar la orden:</p>
          <ol className="list-decimal list-inside pl-4">
            <li>El vendedor preparará y enviará tu artículo</li>
            <li>Recibirás actualizaciones sobre el estado del envío</li>
            <li>Una vez recibido, revisa cuidadosamente el artículo</li>
            <li>Confirma la recepción en la plataforma</li>
          </ol>
          <p className="font-semibold">
            Importante: Tienes un período limitado para reportar cualquier
            problema con tu compra.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Consejo: Si hay algún problema, comunícate inmediatamente con el
            vendedor o con el soporte de la plataforma.
          </p>
        </div>
      ),
    },
    {
      id: 'deja-una-valoracion',
      title: 'Dejar una valoración',
      icon: <FillStarIcon />,
      content: (
        <div className="mt-2 space-y-2">
          <p>Para ayudar a la comunidad:</p>
          <ul className="list-disc list-inside pl-4">
            <li>Deja una valoración honesta sobre tu experiencia</li>
            <li>
              Comenta sobre la calidad del artículo y la comunicación con el
              vendedor
            </li>
            <li>Proporciona feedback constructivo si es necesario</li>
          </ul>
          <p className="text-sm text-gray-600 mt-2">
            Consejo: Las valoraciones justas y detalladas ayudan a otros
            compradores y mejoran la comunidad en general.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">
        Cómo comprar en nuestra plataforma
      </h2>
      <p className="mb-6">
        Comprar en nuestra plataforma es fácil y seguro. Sigue estos pasos para
        encontrar y adquirir los artículos que te encantan:
      </p>
      <div className="space-y-4">
        {steps.map((method) => (
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
        Recuerda que estamos aquí para ayudarte en cada paso del proceso. Si
        tienes alguna pregunta o necesitas asistencia, no dudes en contactar a
        nuestro equipo de soporte.
      </p>
    </div>
  );
}
