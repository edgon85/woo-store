'use client';

import { useFilterStore } from '@/stores';
import { usePathname, useRouter } from 'next/navigation';

export const BadgeCleanFilters = () => {
  const pathName = usePathname();
  const { replace } = useRouter();
  const setFilters = useFilterStore((state) => state.setFilters);
  const handleClick = () => {
    setFilters([]);
    replace(`${pathName}`);
  };

  return (
    <span
      onClick={handleClick}
      className="inline-flex mb-1 items-center px-2 py-1 mr-2 text-sm font-medium text-darkPrimary hover:bg-danger hover:text-white rounded uppercase cursor-pointer"
    >
      Borrar filtros
    </span>
  );
};
