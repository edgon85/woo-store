import { AccordionItem } from '@/components';
import { FaCamera, FaEdit, FaMapPin, FaTag, FaWeight } from 'react-icons/fa';
import { IoLogIn } from 'react-icons/io5';
import { TbCurrencyQuetzal } from 'react-icons/tb';

export default function VenderPage() {
  const steps = [
    {
      id: 'iniciar-sesion-registrarse',
      title: 'Iniciar sesión o registrarse',
      icon: <IoLogIn className="w-6 h-6" />,
      content: (
        <div className="mt-2 space-y-2">
          <p>
            Para comenzar a vender, necesitas tener una cuenta en nuestra
            plataforma. Tienes dos opciones:
          </p>
          <ul className="list-disc list-inside pl-4">
            <li>
              Iniciar sesión con tus redes sociales (Facebook, Google, etc.)
            </li>
            <li>Usar tu correo electrónico y una contraseña</li>
          </ul>
          <p className="text-sm text-gray-600 mt-2">
            Consejo: Si ya tienes una cuenta, asegúrate de que tu perfil esté
            completo y actualizado para generar más confianza en los
            compradores.
          </p>
        </div>
      ),
    },
    {
      id: 'haz-click-en-vender',
      title: "Haz clic en 'Vender ahora'",
      icon: <FaEdit className="w-6 h-6" />,
      content: (
        <div className="mt-2">
          <p>
            Una vez que hayas iniciado sesión, busca el botón &quot;Vender
            ahora&quot; en la parte superior de la página o en tu panel de
            usuario. Este botón te llevará al formulario para crear tu anuncio.
          </p>
        </div>
      ),
    },
    {
      id: 'selecciona-departamento-municipio',
      title: 'Seleccionar departamento y municipio',
      icon: <FaMapPin className="w-6 h-6" />,
      content: (
        <div className="mt-2 space-y-2">
          <p>
            Indica dónde se encuentra el artículo que vas a vender. Esto es
            importante para:
          </p>
          <ul className="list-disc list-inside pl-4">
            <li>Ayudar a los compradores locales a encontrar tu artículo</li>
            <li>Calcular los costos de envío de manera precisa</li>
          </ul>
          <p className="text-sm text-gray-600 mt-2">
            Consejo: Sé lo más específico posible para facilitar las ventas y
            entregas locales.
          </p>
        </div>
      ),
    },
    {
      id: 'tomar-fotografia',
      title: 'Tomar fotografías',
      icon: <FaCamera className="w-6 h-6" />,
      content: (
        <div className="mt-2 space-y-2">
          <p>
            Las fotos son cruciales para atraer compradores. Sigue estos
            consejos:
          </p>
          <ul className="list-disc list-inside pl-4">
            <li>Usa buena iluminación, preferiblemente luz natural</li>
            <li>Toma fotos desde varios ángulos</li>
            <li>Muestra cualquier defecto o detalle importante</li>
            <li>Evita fondos desordenados</li>
          </ul>
          <p className="text-sm text-gray-600 mt-2">
            Consejo Pro: Usa un fondo blanco o neutro para que tu artículo
            destaque. ¡Incluso una sábana blanca puede funcionar como un gran
            fondo!
          </p>
        </div>
      ),
    },
    {
      id: 'titulo-y-descripcion',
      title: 'Título y descripción',
      icon: <FaEdit className="w-6 h-6" />,
      content: (
        <div className="mt-2 space-y-2">
          <p>Crea un título atractivo y una descripción detallada:</p>
          <ul className="list-disc list-inside pl-4">
            <li>Título: Incluye marca, modelo y característica principal</li>
            <li>
              Descripción: Detalla el estado, materiales, medidas y cualquier
              información relevante
            </li>
          </ul>
          <p className="text-sm text-gray-600 mt-2">
            Consejo: Sé honesto sobre el estado del artículo. La transparencia
            genera confianza y evita problemas futuros.
          </p>
        </div>
      ),
    },
    {
      id: 'seleccionar-genero',
      title: 'Seleccionar género',
      icon: <FaTag className="w-6 h-6" />,
      content: (
        <div className="mt-2">
          <p>
            Indica si el artículo es para hombre, mujer, unisex o infantil. Esto
            ayuda a categorizar correctamente tu producto y facilita que los
            compradores interesados lo encuentren.
          </p>
        </div>
      ),
    },
    {
      id: 'detalles-del-articulo',
      title: 'Detalles del artículo',
      icon: <FaTag className="w-6 h-6" />,
      content: (
        <div className="mt-2 space-y-2">
          <p>Proporciona información específica sobre tu artículo:</p>
          <ul className="list-disc list-inside pl-4">
            <li>Categoría y subcategoría</li>
            <li>Marca</li>
            <li>Talla</li>
            <li>Estado (nuevo, como nuevo, buen estado, etc.)</li>
            <li>Color</li>
          </ul>
          <p className="text-sm text-gray-600 mt-2">
            Consejo: Cuanta más información proporciones, más fácil será para
            los compradores encontrar y decidirse por tu artículo.
          </p>
        </div>
      ),
    },
    {
      id: 'peso-del-articulo',
      title: 'Peso del artículo',
      icon: <FaWeight className="w-6 h-6" />,
      content: (
        <div className="mt-2 space-y-2">
          <p>
            Indica el peso aproximado de tu artículo. Esto es importante para
            calcular los costos de envío.
          </p>
          <p className="font-semibold">
            Nota importante: El peso máximo permitido es de 4 libras.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Consejo: Si no estás seguro, es mejor sobreestimar ligeramente el
            peso para evitar sorpresas en los costos de envío.
          </p>
        </div>
      ),
    },
    {
      id: 'precio-del-articulo',
      title: 'Precio del artículo',
      icon: <TbCurrencyQuetzal className="w-6 h-6" />,
      content: (
        <div className="mt-2 space-y-2">
          <p>Establece un precio justo para tu artículo. Considera:</p>
          <ul className="list-disc list-inside pl-4">
            <li>El precio original del artículo</li>
            <li>El estado actual</li>
            <li>Los precios de artículos similares en la plataforma</li>
          </ul>
          <p className="text-sm text-gray-600 mt-2">
            Consejo: Investiga precios de artículos similares en la plataforma
            para establecer un precio competitivo. Recuerda que siempre puedes
            ajustar el precio más adelante si es necesario.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">
        Cómo vender en nuestra plataforma
      </h2>
      <p className="mb-6">
        Vender en nuestra plataforma es fácil y seguro. Sigue estos pasos para
        comenzar:
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
        Recuerda que nuestro equipo de soporte está siempre disponible para
        ayudarte si tienes alguna pregunta durante el proceso de venta. ¡Buena
        suerte con tus ventas!
      </p>
    </div>
  );
}
