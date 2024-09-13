import dynamic from 'next/dynamic';

const DynamicNavbarActions = dynamic(
  () => import('../ui/navbar/Navbar').then((mod) => mod.Navbar),
  {
    ssr: false,
    loading: () => (
      <div className="h-10 w-40 bg-gray-200 animate-pulse rounded"></div>
    ),
  }
);

export default DynamicNavbarActions;
