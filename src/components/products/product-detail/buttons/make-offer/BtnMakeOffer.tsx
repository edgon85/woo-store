'use client';
import { IProduct } from '@/interfaces';
import { useEffect, useState } from 'react';
import { ModalMakeOffer } from './ModalMakeOffer';

import { useAuthStore, useModalAuth } from '@/stores';

type Props = {
  product: IProduct;
  triggerOpen?: boolean;
};

export const BtnMakeOffer = ({ product, triggerOpen = false }: Props) => {
  const [openOfferModal, setOpenOfferModal] = useState(false);
  const { isLoggedIn } = useAuthStore( (state) => state );
  const { openModal } = useModalAuth();

  useEffect(() => {
    if (triggerOpen) {
      setOpenOfferModal(true);
    }
  }, [triggerOpen]);

  const onOpenModal = () => {
    if (isLoggedIn) {
      setOpenOfferModal(true);
    } else {
      openModal();
    }
  };

  return (
    <div>
      <button
        className="w-full border border-cerise-red-700 text-cerise-red-700 text-sm hover:bg-cerise-red-500 hover:text-white rounded flex justify-center items-center py-2"
        onClick={onOpenModal}
      >
        Hacer oferta
      </button>

      <ModalMakeOffer
        product={product}
        open={openOfferModal}
        setOpen={setOpenOfferModal}
      />
    </div>
  );
};
