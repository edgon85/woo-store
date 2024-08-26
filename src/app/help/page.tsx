import { Metadata } from 'next';
import Link from 'next/link';
import { FaMoneyBill, FaShoppingCart, FaTag, FaTruck } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Ayuda',
};

export default function HelpPage() {
  const topics = [
    { name: 'Vender', icon: FaTag, path: '/help/vender' },
    { name: 'Comprar', icon: FaShoppingCart, path: '/help/comprar' },
    {
      name: 'Formas de pago',
      icon: FaMoneyBill,
      path: '/help/comprar/formas-de-pago',
    },
    {
      name: 'Envíos',
      icon: FaTruck,
      path: '/help/vender/envios',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Temas generales</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <Link
            href={topic.path}
            key={topic.name}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <topic.icon />
            <span className="text-lg font-semibold text-center">
              {topic.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
