import { ListGroup } from '@/components/settings/navigation/ListGorup';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  return (
    <div className="container main-wrapper pt-4 flex">
      <div className="w-full md:w-1/5 pr-4 hidden sm:block">
        <h2 className="py-4 pl-1 text-lg font-bold">Ajustes</h2>
        <ListGroup />
      </div>

      <div className="w-full md:w-3/4 pl-2 md:pl-0 pr-2 md:pr-2">
        {children}
      </div>
    </div>
  );
}
