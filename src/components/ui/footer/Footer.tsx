import Link from 'next/link';
import { FacebookIcon } from '../icons';

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
                <Link href="/about" className="hover:underline">
                  Quiénes somos
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:underline">
                  ¿Cómo funciona?
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          {/* <!-- Columna 2 --> */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ayuda</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faqs" className="hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/help/comprar" className="hover:underline">
                  Cómo comprar
                </Link>
              </li>
              <li>
                <Link href="/help/vender" className="hover:underline">
                  Cómo vender
                </Link>
              </li>
            </ul>
          </div>
          {/* <!-- Columna 3 --> */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terminos-y-condiciones"
                  className="hover:underline"
                >
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="/politicas-de-privacidad"
                  className="hover:underline"
                >
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>
          {/* <!-- Columna 4 --> */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/woo.online"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-6 h-6 text-gray-800 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="https://www.instagram.com/woo.online/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-6 h-6 text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 ">
          <div className="flex flex-col md:flex-row  text-sm text-gray-400 gap 2">
            <span>W (wisdom, sabiduría - Prov 24:3-4)</span>
            <span>
              <span className="hidden md:inline">, </span>O (obedience,
              obediencia - Deut 5:33)
            </span>
            <span>
              <span className="hidden md:inline">, </span>O (opportunity,
              oportunidad - Efes 5:16)
            </span>
          </div>
          <p className="text-base text-gray-400 mt-2">
            &copy; {new Date().getFullYear()} Woo. Todos los derechos
          </p>
        </div>
      </div>
    </footer>
  );
};
