'use client';

import { ChevronDown, ChevronUp } from '@/components/ui';
import Link from 'next/link';
import { useState } from 'react';

const categories = [
  //   { name: 'Primeros pasos', path: '/help/primeros-pasos' },
  {
    name: 'Vender',
    path: '/help/vender',
    subcategories: [
      { name: 'Cómo vender', path: '/help/vender' },
      { name: 'Recibir pago', path: '/help/vender/recibir-pago' },
      { name: 'Envíos', path: '/help/vender/envios' },
    ],
  },
  {
    name: 'Comprar',
    path: '/help/comprar',
    subcategories: [
      { name: 'Cómo comprar', path: '/help/comprar' },
      { name: 'Formas de pago', path: '/help/comprar/formas-de-pago' },
    ],
  },
];

export const SidebarHelp = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Centro de ayuda</h1>
        <div className="relative mb-4"></div>
        <nav>
          <Link
            href="/help"
            className="block p-2 hover:bg-gray-100 rounded mb-2"
          >
            Inicio
          </Link>

          {categories.map((category) => (
            <div key={category.name} className="mb-2">
              <button
                onClick={() =>
                  setExpandedCategory(
                    expandedCategory === category.name ? null : category.name
                  )
                }
                className="flex items-center justify-between w-full text-left p-2 hover:bg-gray-100 rounded"
              >
                <span>{category.name}</span>
                {expandedCategory === category.name ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </button>
              {expandedCategory === category.name && (
                <div className="ml-4 mt-2">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.name}
                      href={subcategory.path}
                      className="block p-2 hover:bg-gray-100 rounded"
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};