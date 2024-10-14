'use client';
import { IProduct } from '@/interfaces';
import { useEffect, useState } from 'react';
import { MakeOfferContent } from './MakeOfferContent';

import { useAuthStore, useModalAuth, useModalStore } from '@/stores';

type Props = {
  product: IProduct;
  triggerOpen?: boolean;
};

export const BtnMakeOffer = ({ product, triggerOpen = false }: Props) => {
  const openOfferModal = useModalStore((state) => state.openModal);

  const { isLoggedIn } = useAuthStore((state) => state);
  const { openModal } = useModalAuth();

  useEffect(() => {
    if (triggerOpen) {
      openOfferModal(<MakeOfferContent product={product} />, 'Haz una oferta');
    }
  }, [openOfferModal, product, triggerOpen]);

  const onOpenModal = () => {
    if (isLoggedIn) {
      openOfferModal(<MakeOfferContent product={product} />, 'Haz una oferta');
    } else {
      openModal();
    }
  };

  return (
    <>
      <button
        className="w-full border border-cerise-red-700 text-cerise-red-700 text-sm hover:bg-cerise-red-500 hover:text-white rounded flex justify-center items-center py-2"
        onClick={onOpenModal}
      >
        Hacer oferta
      </button>
    </>
  );
};
