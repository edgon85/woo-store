import { ButtonFilter, NavCategories } from '@/components';
import { SidebarFilter } from '@/components/ui';

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    gender: string;
    category: string;
    subcategory: string;
    clothesType: string;
  };
}) {
  return (
    <div className="container main-wrapper pt-4 flex">
      {/* <!-- Sección de Categorías (Lado Izquierdo) --> */}
      <div className="w-full md:w-1/5 pr-4 hidden sm:block">
        {/* <NavCategories
          gender={params.gender}
          category={params.category}
          clothesType={params.clothesType}
        /> */}
        <p>filtros por busqueda</p>
      </div>

      {/* <!-- Sección de Cuadrícula de 4 Columnas (Lado Derecho) --> */}
      <div className="w-full md:w-3/4 pl-2 md:pl-0 pr-2 md:pr-2">
        {children}
      </div>
    </div>
  );
}
