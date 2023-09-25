import { Button, Divider } from '@/components/ui';
import { IProduct } from '@/interfaces';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-responsive-modal';

type Props = {
  product: IProduct;
};

type FormData = {
  price: string;
};

export const BtnMakeOffer = ({ product }: Props) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div>
      <Button
        label="Hacer oferta"
        type="button"
        outlined
        onClick={onOpenModal}
      />
      <Modal open={open} onClose={onCloseModal} center>
        <section className="w-96">
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <Button label="Enviar oferta" type="submit" />
            </div>
          </form>
        </section>
      </Modal>
    </div>
  );
};
