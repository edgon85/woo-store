'use client';
import { useSidebar } from '@/stores';
import React from 'react';
import { FilterIcon } from '../icons';

export const ButtonFilter = () => {
  const menuFilterOpen = useSidebar((state) => state.onSidebarFilterOpen);

  return (
    <button
      onClick={menuFilterOpen}
      className="flex md:hidden gap-1 font-semibold px-1 py-2 mb-2"
    >
      Filtrar <FilterIcon />
    </button>
  );
};
