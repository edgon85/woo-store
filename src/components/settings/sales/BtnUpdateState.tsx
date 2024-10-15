'use client';

import { updateSendToShippingService } from '@/actions';
import { OrderStatus } from '@/enums';
import { ChangeEvent, useState } from 'react';
import Modal from 'react-responsive-modal';
import Swal from 'sweetalert2';

type Props = {
  orderId: string;
  orderStatus: OrderStatus;
};

export const BtnUpdateState = ({ orderId, orderStatus }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const closeModal = () => setIsOpenModal(false);

  const isButtonEnabled =
    orderStatus === OrderStatus.SellerNotified ||
    orderStatus === OrderStatus.PreparingOrder;

  const handleCheckboxChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.checked) {
      Swal.fire({
        title: '!Esta seguro!',
        text: 'Esto indica que ya has enviado la prenda a paquetería',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, ya lo envié!',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,

        preConfirm: async () => {
          const { ok, message } = await updateSendToShippingService(orderId);

          if (!ok) {
            Swal.showValidationMessage(`error: ${message}`);
            return;
          }

          return 'todo ok';
        },
        allowOutsideClick: () => {
          const popup = Swal.getPopup() as HTMLElement;
          popup.classList.remove('swal2-show');
          return !Swal.isLoading();
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (result.value === 'todo ok') {
            closeModal();
          }
        } else if (result.dismiss) {
          closeModal();
        }
      });
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpenModal(true)}
        className={`rounded text-xs text-white px-2 ${
          isButtonEnabled
            ? 'inline-block bg-cerise-red-600 cursor-pointer'
            : 'display-none '
        }`}
        disabled={!isButtonEnabled}
      >
        actualizar
      </button>

      <Modal open={isOpenModal} onClose={closeModal} center>
        <div className="w-72 md:w-96 py-4 mt-4">
          <div className=" flex flex-col md:flex-row gap-2 justify-between items-center mb-2">
            <div className="flex-1">
              <p className="block">Enviado a paquetería</p>
            </div>
            <div className="flex-1 text-right">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  // checked={isShippingIncluded}
                  onChange={handleCheckboxChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lightPrimary rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
