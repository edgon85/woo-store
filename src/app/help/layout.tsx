import { SidebarHelp } from '@/components';

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen main-wrapper">
      {/* Sidebar */}
      <div className="w-full md:w-64 md:flex-shrink-0 hidden md:block pt-4">
        <SidebarHelp />
      </div>

      {/* Main content */}
      <div className="flex-grow p-4">{children}</div>
    </div>
  );
}
