import { AccordionItem, HelpCircle } from '@/components';

export default function FaqPage() {
  const faqData = [
    {
      id: 'como-empezar-vender',
      question: '¿Cómo puedo empezar a vender en la plataforma?',
      answer: (
        <div className="mt-2 space-y-2">
          <p>Para empezar a vender, sigue estos pasos:</p>
          <ol className="list-decimal list-inside pl-4">
            <li>Crea una cuenta en nuestra plataforma</li>
            <li>Haz clic en el botón &apos;Vender ahora&apos;</li>
            <li>Sube fotos claras de tu prenda</li>
            <li>Añade una descripción detallada</li>
            <li>Selecciona una categoría adecuada</li>
            <li>Establece un precio competitivo</li>
          </ol>
          <p className="text-sm text-gray-600 mt-2">
            Una vez publicado, tu artículo estará disponible para que otros
            usuarios lo vean y compren.
          </p>
        </div>
      ),
    },
    {
      id: 'costo-usar-plataforma',
      question: '¿Cuánto cuesta usar la plataforma?',
      answer: (
        <div className="mt-2 space-y-2">
          <p>El uso básico de la plataforma es gratuito:</p>
          <ul className="list-disc list-inside pl-4">
            <li>Registrarse es completamente gratis</li>
            <li>Navegar por la plataforma no tiene costo</li>
          </ul>
          <p className="font-semibold mt-2">Comisiones por ventas:</p>
          <ul className="list-disc list-inside pl-4">
            <li>
              Solo cobramos una pequeña comisión sobre las ventas realizadas
            </li>
            <li>La comisión exacta varía según varios factores</li>
            <li>Generalmente es un porcentaje del precio de venta</li>
          </ul>
          <p className="text-sm text-gray-600 mt-2">
            Para más detalles, consulta nuestra sección de &apos;Tarifas y
            Comisiones&apos;.
          </p>
        </div>
      ),
    },

    {
      id: 'articulo-no-coincide',
      question:
        '¿Qué hago si el artículo que recibo no coincide con la descripción?',
      answer: (
        <div className="mt-2 space-y-2">
          <p>
            Si el artículo recibido no coincide con la descripción o tiene algún
            problema:
          </p>
          <ol className="list-decimal list-inside pl-4">
            <li>
              Inicia una reclamo dentro de los 2 días siguientes a la recepción
            </li>
            <li>Ve a la sección de tus compras</li>
            <li>Selecciona el artículo en cuestión</li>
            <li>Elige la opción &apos;necesito ayuda&apos;</li>
            <li>Elige la opción &apos;reportar un problema&apos;</li>
          </ol>
          <p className="font-semibold mt-2">
            Nuestro equipo de atención al cliente revisará el caso y te ayudará
            a resolverlo.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Recuerda proporcionar toda la información y evidencia posible para
            agilizar el proceso.
          </p>
        </div>
      ),
    },
    {
      id: 'devoluciones',
      question: '¿Puedo devolver un artículo si no me queda bien?',
      answer: (
        <div className="mt-2 space-y-2">
          <p>Como plataforma de compraventa entre particulares:</p>
          <ul className="list-disc list-inside pl-4">
            <li>
              No ofrecemos devoluciones por tallas o preferencias personales
            </li>
            <li>
              Animamos a los compradores a revisar cuidadosamente las medidas y
              descripciones antes de comprar
            </li>
          </ul>
          <p className="font-semibold mt-2">Excepción:</p>
          <p>
            Si el artículo es significativamente diferente a lo descrito, puedes
            iniciar una disputa como se mencionó en la pregunta anterior.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Consejo: Siempre revisa detalladamente las medidas y
            especificaciones antes de realizar una compra.
          </p>
        </div>
      ),
    },
    {
      id: 'realizacion-envios',
      question: '¿Cómo se realizan los envíos?',
      answer: (
        <div className="mt-2 space-y-2">
          <p>Los envíos se realizan de la siguiente manera:</p>
          <ul className="list-disc list-inside pl-4">
            <li>
              Los vendedores son responsables de empacar la prenda vendida
            </li>
            <li>
              Los vendedores son encargados de enviar la prenda por la
              paquetería asignada
            </li>
            <li>
              Ofrecemos la opción de generar etiquetas de envío prepagadas a
              través de nuestros socios logísticos
            </li>
          </ul>
        </div>
      ),
    },
  ];
  return (
    <div className="max-w-3xl mx-auto mt-4 md:mt-8">
      <h2 className="text-3xl font-semibold mb-6">Preguntas Frecuentes</h2>
      <p className="mb-6">
        Encuentra respuestas a las preguntas más comunes sobre nuestra
        plataforma:
      </p>
      <div className="space-y-4">
        {faqData.map((faq) => (
          <AccordionItem
            key={faq.id}
            id={faq.id}
            title={faq.question}
            icon={<HelpCircle />}
            content={faq.answer}
          />
        ))}
      </div>
      <p className="mt-6 text-sm text-gray-600">
        Si no encuentras la respuesta que buscas, no dudes en contactar a
        nuestro equipo de soporte. Estamos aquí para ayudarte.
      </p>
    </div>
  );
}
