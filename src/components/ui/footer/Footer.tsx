export const Footer = () => {
  return (
    <footer className="bg-white text-gray-900 mt-8">
      <div style={{ overflow: 'hidden' }}>
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
          style={{ fill: '#f6f6f6', width: '134%', height: 55 }}
        >
          <path d="M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0v27.35a600.21 600.21 0 00321.39 29.09z" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* <!-- Columna 1 --> */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sobre Nosotros</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Quiénes somos
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  ¿Cómo funciona?
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contacto
                </a>
              </li>
              {/* <li><a href="#" className="hover:underline">Blog</a></li> */}
            </ul>
          </div>
          {/* <!-- Columna 2 --> */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ayuda</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Cómo comprar
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Cómo vender
                </a>
              </li>
              {/* <li><a href="#" className="hover:underline">Contacto</a></li> */}
            </ul>
          </div>
          {/* <!-- Columna 3 --> */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Política de privacidad
                </a>
              </li>
              {/* <li><a href="#" className="hover:underline">Política de cookies</a></li> */}
            </ul>
          </div>
          {/* <!-- Columna 4 --> */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {/* <!-- Icono de redes sociales --> */}
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {/* <!-- Icono de redes sociales --> */}
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {/* <!-- Icono de redes sociales --> */}
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 md:flex md:items-center md:justify-between">
          <p className="text-base text-gray-400">
            &copy; 2024 Woo. Todos los derechos reservados.
          </p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white mr-4">
              Términos y condiciones
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Política de privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
