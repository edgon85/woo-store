import { ButtonFilter, NavCategories } from '@/components';
import { SidebarFilter } from '@/components/ui';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen main-wrapper">
      {/* Sidebar */}
      <div className="w-full md:w-64 md:flex-shrink-0 hidden md:block pt-4">
        <NavCategories />
      </div>

      {/* Main content */}
      <div className="flex-grow p-4">
        <ButtonFilter />
        {children}
        <SidebarFilter filters={<NavCategories isMobile={true} />} />
      </div>
    </div>
  );
}
