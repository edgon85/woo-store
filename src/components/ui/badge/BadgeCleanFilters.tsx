'use client'
import { useFilter } from '@/hooks';
import { generateFilterURL } from '@/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const BadgeCleanFilters = () => {
  const pathName = usePathname();
  const { replace } = useRouter();
  const { setFilters, filters } = useFilter();

  const handleClick = () => {
    setFilters([]);
  };

  useEffect(() => {
    const url = generateFilterURL(filters);
    replace(`${pathName}${url}`);
  }, [filters, pathName, replace]);

  return (
    <span
      onClick={handleClick}
      className="inline-flex mb-1 items-center px-2 py-1 mr-2 text-sm font-medium text-darkPrimary hover:bg-danger hover:text-white rounded uppercase cursor-pointer"
    >
      Borrar filtros
    </span>
  );
};
