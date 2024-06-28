import './globals.css';

import { Roboto } from 'next/font/google';
import { Providers } from './providers';
import { Footer, NavClothesType, Navbar } from '@/components';
import Sidebar from '@/components/ui/navbar/sidebar/Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Woo store',
  description: 'Compra y vende ropa de segunda',
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
          <div>
            <Navbar />
            <NavClothesType />
            <Sidebar />
            {children}
            <ToastContainer />
          </div>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
