import { create } from 'zustand';

interface ModalAuthState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModalAuth = create<ModalAuthState>()((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
