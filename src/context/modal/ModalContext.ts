import { createContext } from 'react';

type ContextProps = {
  isOpen: boolean;
  id: string;
  onOpenModal: (id: string) => void;
  onCloseModal: () => void;
};

export const ModalContext = createContext<ContextProps>({} as ContextProps);
