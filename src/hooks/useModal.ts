import { ModalContext } from '@/context';
import { useContext } from 'react';

export const useModal = () => {
  const { isOpen, onOpenModal, onCloseModal, id } = useContext(ModalContext);

  return {
    isOpen,
    id,

    onOpenModal,
    onCloseModal,
  };
};
