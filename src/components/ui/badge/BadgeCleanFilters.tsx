import { useFilter } from '@/hooks';
import { useRouter } from 'next/navigation';
import React from 'react';

export const BadgeCleanFilters = () => {
  const router = useRouter();
  const { setFilters, gender, category, subcategory } = useFilter();

  const subCatPath = subcategory.id !== '' ? `/${subcategory.slug}` : '';

  const handleClick = () => {
    setFilters([]);
    router.push(`/${gender}/${category.slug}${subCatPath}`);
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
