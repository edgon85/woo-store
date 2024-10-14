import { create } from 'zustand';

interface ModalState {
  title?: string;
  isOpen: boolean;
  bodyContent: JSX.Element | null;
  openModal: (content: JSX.Element, title?: string) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  title: '',
  isOpen: false,
  bodyContent: null,
  openModal: (content, title) =>
    set({ isOpen: true, bodyContent: content, title }),
  closeModal: () => set({ isOpen: false, title: undefined, bodyContent: null }),
}));
