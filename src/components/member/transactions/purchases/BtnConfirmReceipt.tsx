'use client';
import { updateConfirmReceipt } from '@/actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Modal from 'react-responsive-modal';

type Props = {
  orderId: string;
};

export const BtnConfirmReceipt = ({ orderId }: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const closeModal = () => {
    setModalOpen(false);
  };

  const onHandleConfirmReceipt = async () => {
    const { ok, message } = await updateConfirmReceipt(orderId);
    if (ok) {
      router.replace(`/settings/transactions/purchases/rating-user/${orderId}`);
    } else {
      console.log(message);
    }

    closeModal();
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="w-full px-4 py-2 rounded bg-cerise-red-600 hover:bg-cerise-red-500 text-white"
      >
        Confirmar recepción
      </button>

      <Modal onClose={closeModal} open={isModalOpen} center>
        <div className="w-72 md:w-96 py-4">
          <h3 className="py-2">Confirmar recepción</h3>
          <hr />
          <p className="py-4">
            Si confirmas la correcta recepción de la prenda, no podrás abrir un
            reclamo más tarde
          </p>

          <div className="flex py-4">
            <button
              onClick={onHandleConfirmReceipt}
              className="w-full px-4 py-2 rounded bg-cerise-red-600 hover:bg-cerise-red-500 text-white"
            >
              Confirmar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
