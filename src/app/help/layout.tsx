import { SidebarHelp } from '@/components';

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container main-wrapper pt-4 flex">
      <div className="w-full md:w-1/5 pr-4 hidden sm:block">
        <SidebarHelp />
      </div>

      <div className="w-full md:w-3/4 pl-2 md:pl-0 pr-2 md:pr-2 min-h-[70vh] pt-4">
        {children}
      </div>
    </div>
  );
}
