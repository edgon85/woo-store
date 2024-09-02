import { Filter } from '@/interfaces';
import { create } from 'zustand';

interface FilterState {
  filters: Filter[];

  setFilters: (
    filtersOrUpdater: Filter[] | ((prevFilters: Filter[]) => Filter[])
  ) => void;
}

export const useSearchFilterStore = create<FilterState>()((set) => ({
  filters: [],

  setFilters: (filtersOrUpdater) =>
    set((state) => ({
      filters:
        typeof filtersOrUpdater === 'function'
          ? filtersOrUpdater(state.filters)
          : filtersOrUpdater,
    })),
}));
