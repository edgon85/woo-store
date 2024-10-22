import './globals.css';
import 'react-responsive-modal/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

import { Providers } from './providers';
import { AuthModal, Footer, Navbar } from '@/components';
import Sidebar from '@/components/ui/navbar/sidebar/Sidebar';
import { Suspense } from 'react';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Woo store',
    default: 'Woo store',
  },
  description:
    'Descubre miles de artículos de moda a precios increíbles. Renueva tu closet y vende lo que ya no usas en nuestra plataforma fácil y segura.',
  metadataBase: new URL(`${process.env.BASE_URL}`),
  alternates: {
    canonical: '/',
    languages: {
      'es-ES': '/es-ES',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: new URL(`${process.env.BASE_URL}`),
    title: 'Woo Store',
    description:
      'Descubre miles de artículos de moda a precios increíbles. Renueva tu closet y vende lo que ya no usas en nuestra plataforma fácil y segura.',
    images: [
      {
        url: `${process.env.BASE_URL}/opengraph-image.png`,
        width: 800,
        height: 400,
        alt: 'WooStore',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          <Suspense>
            <Navbar />
          </Suspense>
          <Sidebar />
          <div className="min-h-[70vh]">{children}</div>
          <ToastContainer />
          <Footer />
          <AuthModal />
        </Providers>
      </body>
    </html>
  );
}
