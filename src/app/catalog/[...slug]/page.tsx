'use client';

import { IProduct } from '@/interfaces';
import { generateFilterURL } from '@/utils';
import { useFetcher, useFilter } from '@/hooks';
import {
  NavCategories,
  BadgeCleanFilters,
  BadgeFilter,
  ProductCard,
} from '@/components';
import Cookies from 'js-cookie';

/* export default function ExampleClientComponent({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: {
    filter?: string;
  };
}) { */
// console.log(params.slug);
// console.log(searchParams);

export default function ExampleClientComponent() {
  const { filters, gender, category } = useFilter();
  const currentUserId = Cookies.get('userId');

  // Genera la URL concatenando los grupos
  const url = generateFilterURL(filters, gender, category.slug);
  const { data: products, isError } = useFetcher<IProduct[]>(url);

  return (
    <div className="container main-wrapper pt-4 flex">
      <div className="w-full md:w-1/5 pr-4 hidden sm:block">
        <NavCategories />
      </div>

      <div className="w-full md:w-3/4 pl-2 md:pl-0 pr-2 md:pr-2">
        <div className="border py-2 overflow-scroll">
          <p>filtros</p>
          {filters.map((filter) => (
            <BadgeFilter key={filter.slug} filterItem={filter} />
          ))}
          {filters.length > 0 ? <BadgeCleanFilters /> : null}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currentUserId={currentUserId || ''}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* 

 // const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { filters } = useFilter();

  const color = searchParams.get('color');
  const brand = searchParams.get('brand');
  const getAllBrands = searchParams.getAll('brand
*/
/* 
construir esta ruta
http://localhost:3000/shop/vestido?color=red,black,whithe&brand=adidas,american-eagle-outfitters
[
  {
    "slug": "aeropostale",
    "title": "aeropostale",
    "type": "brand"
  },
  {
    "slug": "7xl",
    "title": "7xl",
    "type": "measurement"
  },
  {
    "slug": "nuevo-sin-etiquetas",
    "title": "nuevo sin etiquetas",
    "type": "clothes-state"
  },
  {
    "slug": "amarillo",
    "title": "amarillo",
    "type": "color"
  },
  {
    "slug": "aldo",
    "title": "aldo",
    "type": "brand"
  },
  {
    "slug": "unica",
    "title": "unica",
    "type": "measurement"
  },
  {
    "slug": "usado",
    "title": "usado",
    "type": "clothes-state"
  },
  {
    "slug": "beige",
    "title": "beige",
    "type": "color"
  }
]
*/

/* 
------- Sidebar -----
*/
/* import React, { useState } from 'react';

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="h-screen bg-gray-200">
       Botón para abrir/cerrar el menú
      <button
        className="fixed top-0 left-0 m-4 p-2 bg-white rounded-lg shadow-md"
        onClick={toggleMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Sidebar * /}
      <div
        className={`fixed h-screen bg-white w-64 transition-all duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        <ul className="mt-8 ml-4 space-y-2">
          <li className="pl-2">Marca</li>
          <ul className="ml-2">
            <li>Marca 1</li>
            <li>Marca 2</li>
          </ul>
          <li className="pl-2">Colores</li>
          <ul className="ml-2">
            <li>Rojo</li>
            <li>Verde</li>
          </ul>
          <li className="pl-2">Tallas</li>
          <ul className="ml-2">
            <li>Talla 1</li>
            <li>Talla 2</li>
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar; */
