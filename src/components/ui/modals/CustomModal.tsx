'use client';
import { useEffect, useRef } from 'react';
import { useModalStore } from '@/stores';
import { CloseIcon } from '@/components/ui';

export const CustomModal = () => {
  const { isOpen, bodyContent, closeModal, title } = useModalStore();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event: any) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 md:p-0">
      <div
        ref={modalRef}
        className="bg-white rounded shadow-xl w-full max-w-md max-h-[90vh] flex flex-col"
      >
        <div className="flex justify-between items-center p-2 shadow-sm">
          <h2 className="text-base font-semibold text-gray-400">{title}</h2>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 -webkit-overflow-scrolling-touch">
          {bodyContent}
        </div>
      </div>
    </div>
  );
};
