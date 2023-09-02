import './globals.css';
import { Roboto } from 'next/font/google';
import { Providers } from './providers';
import { NavClothesType, Navbar } from '@/components';

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
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
