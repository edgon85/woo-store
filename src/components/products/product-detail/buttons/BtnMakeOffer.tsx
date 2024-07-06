'use client';
import { makeOffer } from '@/actions';
import { Button, Divider } from '@/components/ui';
import { IProduct } from '@/interfaces';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-responsive-modal';
import { toast } from 'react-toastify';
import OfferSlider from './OfferSlider';

type Props = {
  product: IProduct;
  triggerOpen?: boolean;
};

type FormData = {
  price: number;
};

export const BtnMakeOffer = ({ product, triggerOpen = false }: Props) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [offerPrice, setOfferPrice] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>();

  useEffect(() => {
    if (triggerOpen) {
      setOpen(true);
    }
  }, [triggerOpen]);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    reset();
  };

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
    <div>
      <button
        className="w-full border border-cerise-red-700 text-cerise-red-700 text-sm hover:bg-cerise-red-500 hover:text-white rounded flex justify-center items-center py-2"
        onClick={onOpenModal}
      >
        Hacer oferta
      </button>

      <Modal open={open} onClose={onCloseModal} center>
        <section className="md:w-96">
          <form onSubmit={handleSubmit(onSubmit)}>
            <OfferSlider
              productPrice={product.price}
              onOfferChange={handleOfferChange}
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
      </Modal>
    </div>
  );
};

/* 
 <h2 className="text-center text-lg font-semibold">Hacer oferta</h2>
            <Divider />
            <div className="mb-6">
              <label
                htmlFor="offer"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Precio a ofrecer
              </label>
              <input
                type="number"
                id="offer"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                placeholder="Q0.00"
                {...register('price', {
                  required: 'Este campo es requerido',
                  valueAsNumber: true,
                  min: { value: 1, message: 'El valor debe ser positivo' },
                  max: {
                    value: product.price - 1,
                    message: `El valor debe ser menor a ${product.price}`,
                  },
                })}
              />
              {errors.price && (
                <span className="text-sm text-red-800">
                  {errors.price.message}
                </span>
              )}
            </div>
            <span>¿Te encantó? ¡Adquiérelo ya antes de que se agote!</span>
            <div className="pt-2">
              <Button
                label={isSubmitting ? 'Enviando...' : 'Enviar oferta'}
                type="submit"
                disabled={isSubmitting}
              />
            </div>
*/
