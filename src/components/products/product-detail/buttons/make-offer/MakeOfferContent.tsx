'use client';

import OfferSlider from './OfferSlider';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { makeOffer } from '@/actions';
import { IProduct } from '@/interfaces';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui';
import { useModalStore } from '@/stores';

type FormData = {
  price: number;
};

type Props = {
  product: IProduct;
};

export const MakeOfferContent = ({ product }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onCloseModal = useModalStore((state) => state.closeModal);

  const [offerPrice, setOfferPrice] = useState(0);

  const { handleSubmit, setValue, reset } = useForm<FormData>();

  const handleOfferChange = (price: number) => {
    setOfferPrice(price);
    setValue('price', offerPrice);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const result = await makeOffer(product.id!, Number(data.price));
      if (result.ok) {
        toast.success('¡Oferta enviada con éxito!');
        onCloseModal();
      } else {
        toast.error(
          result.message ||
            'Error al enviar la oferta. Por favor, intenta de nuevo.'
        );
      }
    } catch (error) {
      toast.error('Error al enviar la oferta. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <OfferSlider
          productPrice={product.price}
          onOfferChange={handleOfferChange}
          serviceFee={product.fee || 0}
        />
        <div className="mt-4">
          <Button
            label={isSubmitting ? 'Enviando...' : 'Enviar oferta'}
            type="submit"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </section>
  );
};
