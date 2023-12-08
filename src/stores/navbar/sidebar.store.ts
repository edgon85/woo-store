import { create } from 'zustand';

interface SidebarState {
  sidebarOpen: boolean;
  onSidebarOpen: () => void;
}

export const useSidebar = create<SidebarState>()((set) => ({
  sidebarOpen: false,

  onSidebarOpen: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
