import { ButtonFilter, SidebarFilter } from '@/components';
import { NavFilters } from '@/components/search/Filters';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container main-wrapper pt-4 flex">
      {/* <!-- Sección de Categorías (Lado Izquierdo) --> */}
      <div className="w-full md:w-1/5 pr-4 hidden sm:block">
        <NavFilters />
      </div>

      {/* <!-- Sección de Cuadrícula de 4 Columnas (Lado Derecho) --> */}
      <div className="w-full md:w-3/4 pl-2 md:pl-0 pr-2 md:pr-2">
        <ButtonFilter />
        {children}
      </div>
      <SidebarFilter filters={<NavFilters isMobile={true} />} />
    </div>
  );
}
