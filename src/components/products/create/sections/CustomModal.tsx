import { useModalStore } from '@/stores';
import Modal from 'react-responsive-modal';

export const CustomModal = () => {
  const { isOpen, bodyContent, closeModal } = useModalStore();

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      center
      closeOnOverlayClick={false}
      
    >
      <div className='max-h-[50vh] overflow-y-scroll'>
      {bodyContent}
      </div>
    </Modal>
  );
};
