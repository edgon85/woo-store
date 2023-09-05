import { NavCategories } from '@/components';

export default function SubcategoryPage() {
  return (
    <div className="container main-wrapper pt-4 flex">
      {/* <!-- Sección de Categorías (Lado Izquierdo) --> */}
      <div className="w-full md:w-1/5 pr-4 hidden sm:block">
        <NavCategories />
      </div>

      {/* <!-- Sección de Cuadrícula de 4 Columnas (Lado Derecho) --> */}
      <div className="w-full md:w-3/4 pl-2 md:pl-0 pr-2 md:pr-2">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <h2>productos</h2>
          {/* {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))} */}
        </div>
      </div>
    </div>
  );
}
