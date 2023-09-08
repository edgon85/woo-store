'use client';

import { NavCategories } from '@/components';
import { usePathname, useSearchParams } from 'next/navigation';

export default function ExampleClientComponent() {
  // const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const color = searchParams.get('color');
  const brand = searchParams.get('brand');
  const getAllBrands = searchParams.getAll('brand');

  console.log(getAllBrands);
  // console.log();
  /*  console.log(pathname);
  console.log(color);
  console.log(brand); */
  return (
    <div className="container main-wrapper pt-4 flex">
      {/* <!-- Sección de Categorías (Lado Izquierdo) --> */}
      <div className="w-full md:w-1/5 pr-4 hidden sm:block">
        <NavCategories />
      </div>

      {/* <!-- Sección de Cuadrícula de 4 Columnas (Lado Derecho) --> */}
      <div className="w-full md:w-3/4 pl-2 md:pl-0 pr-2 md:pr-2">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))} */}
          <h2>Product 1</h2>
          <h2>Product 2</h2>
          <h2>Product 3</h2>
        </div>
      </div>
    </div>
  );
}
/* 
construir esta ruta
http://localhost:3000/shop/vestido?color=red,black,whithe&brand=adidas,american-eagle-outfitters

*/
