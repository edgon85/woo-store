export default function TermAndConditionsPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Términos y Condiciones
      </h1>

      <p className="mb-6 text-gray-600">
        Por favor, lea cuidadosamente estos términos y condiciones antes de usar
        nuestra plataforma. Al acceder o utilizar nuestro servicio, usted acepta
        estar sujeto a estos términos.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          1. Aceptación de los Términos
        </h2>
        <p className="text-gray-700">
          Al acceder y utilizar esta plataforma, usted acepta cumplir y estar
          sujeto a estos Términos y Condiciones. Si no está de acuerdo con
          alguna parte de estos términos, no podrá utilizar nuestros servicios.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          2. Responsabilidades del Usuario
        </h2>
        <p className="text-gray-700 mb-4">
          Como usuario de nuestra plataforma, usted se compromete a:
        </p>
        <ul className="list-disc list-inside pl-4 text-gray-700 space-y-2">
          <li>
            Proporcionar información precisa y actualizada durante el registro y
            uso de la plataforma.
          </li>
          <li>Mantener la confidencialidad de su cuenta y contraseña.</li>
          <li>
            No utilizar la plataforma para actividades ilegales o no
            autorizadas.
          </li>
          <li>
            No infringir los derechos de propiedad intelectual de terceros al
            vender artículos.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          3. Políticas de Listado
        </h2>
        <p className="text-gray-700 mb-4">
          Al publicar artículos para la venta, usted acepta:
        </p>
        <ul className="list-disc list-inside pl-4 text-gray-700 space-y-2">
          <li>
            Proporcionar descripciones precisas y honestas de los artículos.
          </li>
          <li>Establecer precios razonables y competitivos.</li>
          <li>
            No listar artículos prohibidos o restringidos por la ley o nuestras
            políticas.
          </li>
          <li>
            Cumplir con todas las regulaciones aplicables relacionadas con la
            venta de sus artículos.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          4. Transacciones
        </h2>
        <p className="text-gray-700 mb-4">
          Respecto a las transacciones en nuestra plataforma:
        </p>
        <ul className="list-disc list-inside pl-4 text-gray-700 space-y-2">
          <li>Actuamos como intermediario entre compradores y vendedores.</li>
          <li>
            No somos responsables de la calidad, seguridad o legalidad de los
            artículos vendidos.
          </li>
          <li>
            Nos reservamos el derecho de retener pagos en caso de disputa o
            sospecha de fraude.
          </li>
          <li>
            Los usuarios deben resolver las disputas de buena fe, con nuestra
            mediación si es necesario.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          5. Tarifas y Pagos
        </h2>
        <p className="text-gray-700 mb-4">
          Sobre las tarifas y pagos en nuestra plataforma:
        </p>
        <ul className="list-disc list-inside pl-4 text-gray-700 space-y-2">
          <li>
            Cobramos una comisión por cada venta realizada, cuyo porcentaje está
            sujeto a cambios.
          </li>
          <li>
            Los pagos a los vendedores se procesarán según los términos
            especificados en nuestras políticas de pago.
          </li>
          <li>
            Nos reservamos el derecho de cambiar nuestras estructuras de tarifas
            con previo aviso.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          6. Terminación de Servicios
        </h2>
        <p className="text-gray-700 mb-4">Nos reservamos el derecho de:</p>
        <ul className="list-disc list-inside pl-4 text-gray-700 space-y-2">
          <li>
            Terminar o suspender su acceso a nuestros servicios inmediatamente,
            sin previo aviso, por cualquier motivo, incluyendo el incumplimiento
            de estos Términos.
          </li>
          <li>
            Eliminar o modificar cualquier contenido en la plataforma a nuestra
            discreción.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          7. Modificaciones a los Términos
        </h2>
        <p className="text-gray-700">
          Nos reservamos el derecho de modificar estos términos en cualquier
          momento. Le notificaremos de cualquier cambio publicando los nuevos
          términos en esta plataforma. Es su responsabilidad revisar estos
          términos periódicamente.
        </p>
      </section>

      <p className="mt-8 text-sm text-gray-600">
        Última actualización: [01/06/2024]
      </p>
    </div>
  );
}
