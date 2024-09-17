export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Política de Privacidad
      </h1>

      <p className="mb-6 text-gray-600">
        Esta política de privacidad describe cómo recopilamos, usamos y
        protegemos su información personal. Por favor, lea cuidadosamente esta
        política antes de usar nuestra plataforma.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          1. Recopilación de Información
        </h2>
        <p className="text-gray-700 mb-4">
          Recopilamos la siguiente información:
        </p>
        <ul className="list-disc list-inside pl-4 text-gray-700 space-y-2">
          <li>
            Información personal proporcionada durante el registro (nombre,
            correo electrónico, dirección).
          </li>
          <li>Información de transacciones y listados de productos.</li>
          <li>Información de uso y navegación en nuestra plataforma.</li>
          <li>
            Comunicaciones entre usuarios y con nuestro equipo de soporte.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          2. Uso de la Información
        </h2>
        <p className="text-gray-700 mb-4">Utilizamos su información para:</p>
        <ul className="list-disc list-inside pl-4 text-gray-700 space-y-2">
          <li>Facilitar transacciones entre compradores y vendedores.</li>
          <li>Mejorar y personalizar nuestros servicios.</li>
          <li>Comunicarnos con usted sobre su cuenta y nuestros servicios.</li>
          <li>Prevenir fraudes y actividades ilegales.</li>
          <li>Cumplir con obligaciones legales.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          3. Compartir Información
        </h2>
        <p className="text-gray-700 mb-4">
          Podemos compartir su información con:
        </p>
        <ul className="list-disc list-inside pl-4 text-gray-700 space-y-2">
          <li>
            Otros usuarios, según sea necesario para facilitar transacciones.
          </li>
          <li>
            Proveedores de servicios que nos ayudan a operar nuestra plataforma.
          </li>
          <li>Autoridades legales cuando sea requerido por la ley.</li>
        </ul>
        <p className="text-gray-700 mt-4">
          No vendemos su información personal a terceros.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          4. Seguridad de Datos
        </h2>
        <p className="text-gray-700 mb-4">
          Implementamos medidas de seguridad para proteger su información,
          incluyendo:
        </p>
        <ul className="list-disc list-inside pl-4 text-gray-700 space-y-2">
          <li>Encriptación de datos sensibles.</li>
          <li>
            Acceso restringido a información personal por parte de nuestros
            empleados.
          </li>
          <li>
            Monitoreo regular de nuestros sistemas para detectar
            vulnerabilidades.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          5. Derechos del Usuario
        </h2>
        <p className="text-gray-700 mb-4">Usted tiene derecho a:</p>
        <ul className="list-disc list-inside pl-4 text-gray-700 space-y-2">
          <li>Acceder a su información personal.</li>
          <li>Corregir información inexacta.</li>
          <li>
            Solicitar la eliminación de sus datos (sujeto a ciertas
            excepciones).
          </li>
          <li>Oponerse al procesamiento de su información.</li>
          <li>Retirar su consentimiento en cualquier momento.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          6. Uso de Cookies
        </h2>
        <p className="text-gray-700 mb-4">Utilizamos cookies para:</p>
        <ul className="list-disc list-inside pl-4 text-gray-700 space-y-2">
          <li>Mantener su sesión activa.</li>
          <li>Recordar sus preferencias.</li>
          <li>Analizar el uso de nuestra plataforma.</li>
          <li>Personalizar su experiencia.</li>
        </ul>
        <p className="text-gray-700 mt-4">
          Puede gestionar las preferencias de cookies a través de la
          configuración de su navegador.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          7. Cambios en la Política de Privacidad
        </h2>
        <p className="text-gray-700">
          Nos reservamos el derecho de modificar esta política en cualquier
          momento. Le notificaremos sobre cambios significativos a través de un
          aviso en nuestra plataforma o por correo electrónico.
        </p>
      </section>

      <p className="mt-8 text-sm text-gray-600">
        Última actualización: [01/06/2024]
      </p>
    </div>
  );
}
