import { Filter } from '@/interfaces';
import { create } from 'zustand';

interface FilterState {
  filters: Filter[];

  setFilters: (value: Filter[]) => void;
}

export const useFilterStore = create<FilterState>()((set) => ({
  filters: [],

  //   setFilters: (value: Filter[]) => set((state) => ({ filters: value })),
  setFilters: (value: Filter[]) => set({ filters: value }),
}));
