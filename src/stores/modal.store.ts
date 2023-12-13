import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  bodyContent: JSX.Element | null;
  openModal: (content: JSX.Element) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  isOpen: false,
  bodyContent: null,
  openModal: (content) => set({ isOpen: true, bodyContent: content }),
  closeModal: () => set({ isOpen: false, bodyContent: null }),
}));
