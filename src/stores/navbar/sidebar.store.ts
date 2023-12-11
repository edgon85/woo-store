import { create } from 'zustand';

interface SidebarState {
  sidebarOpen: boolean;
  sidebarFilterOpen: boolean;

  onSidebarOpen: () => void;
  onSidebarFilterOpen: () => void;
}

export const useSidebar = create<SidebarState>()((set) => ({
  sidebarOpen: false,
  sidebarFilterOpen: false,

  onSidebarOpen: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  onSidebarFilterOpen: () =>
    set((state) => ({ sidebarFilterOpen: !state.sidebarFilterOpen })),
}));
