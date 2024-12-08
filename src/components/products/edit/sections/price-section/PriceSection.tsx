import { useCreateProductStore } from '@/stores';
import { FormInputs } from '@/hooks';
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';
import { formatCurrency } from '@/utils';
import { IsShippingIncluded } from './IsShippingIncluded';

type Props = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
  getValues: UseFormGetValues<FormInputs>;
  productId: string;
  sellerFee: number;
};

export const PriceSectionEdit = ({
  register,
  errors,
  getValues,
  productId,
  sellerFee,
}: Props) => {
  const isShippingIncluded = useCreateProductStore(
    (state) => state.isShippingIncluded
  );

  const totalPrice = getValues('price') - sellerFee;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mt-4">
      <div className="relative z-0 w-full mb-6 group p-4 md:p-0">
        <label className="block mb-2 text-sm font-bold text-gray-900 uppercase">
          Precio de venta
        </label>

        <input
          type="number"
          className="block w-full p-4 text-gray-900 border border-divider rounded-md  sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
          placeholder="¿A qué precio lo vendes?"
          {...register('price', {
            required: true,
            valueAsNumber: true,
            validate: {
              positive: (value) =>
                value > 0 || 'El precio debe ser un número positivo',
              integer: (value) =>
                Number.isInteger(value) ||
                'El precio debe ser un número entero',
            },
            min: { value: 50, message: 'El precio debe ser mayor que 50' },
          })}
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
        )}
      </div>
      <IsShippingIncluded productId={productId} />

      <div className="mt-4 p-4 md:p-0">
        <h2 className="text-sm font-bold text-black mb-4">
          DETALLE DEL PRECIO
        </h2>
        <div className="flex justify-between text-black">
          <span>Precio</span>
          <span>{formatCurrency(getValues('price') * 100)}</span>
        </div>
        <div className="flex justify-between text-black mt-2">
          <span>
            Cobro por servicio
            <button className="ml-1 text-orange-500">
              <i className="fas fa-info-circle"></i>
            </button>
          </span>
          <span>{formatCurrency(sellerFee * 100)}</span>
        </div>
        {isShippingIncluded && (
          <div className="flex justify-between text-black mt-2">
            <span>Envío</span>
            <span className="text-xs text-gray-400">
              Se le descontara de los {formatCurrency(totalPrice * 100)}, entre
              20 - 35 Quetzales
            </span>
          </div>
        )}
        <div className="border-t border-gray-300 mt-4"></div>
        <div className="flex justify-between text-black font-bold mt-4">
          <span>Usted recibe</span>
          <span>{formatCurrency(totalPrice * 100)}</span>
        </div>
      </div>
    </div>
  );
};
