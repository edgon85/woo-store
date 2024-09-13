'use client';
import { useState } from 'react';
import Modal from 'react-responsive-modal';
import { FormResetPassword } from './FormResetPassword';

export const ModalResetPassword = () => {
  const [openModal, setOpenModal] = useState(false);
  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="border text-primary border-primary hover:bg-primary hover:text-white p-2 rounded-md "
      >
        Cambiar
      </button>
      <Modal open={openModal} onClose={onCloseModal} center>
        <section className="md:w-96">
          <FormResetPassword setOpenModal={setOpenModal} />
        </section>
      </Modal>
    </>
  );
};
