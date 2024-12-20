import { ChangeEvent, useState } from 'react';

import { useCreateProductStore } from '@/stores';
import { FormInputs } from '@/hooks';
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';
import { formatCurrency } from '@/utils';

type Props = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
  getValues: UseFormGetValues<FormInputs>;
  sellerFee: number;
};

export const PriceSection = ({
  register,
  errors,
  getValues,
  sellerFee,
}: Props) => {
  const setIsShippingIncluded = useCreateProductStore(
    (state) => state.setIsShippingIncluded
  );
  const isShippingIncluded = useCreateProductStore(
    (state) => state.isShippingIncluded
  );

  const handleCheckboxChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setIsShippingIncluded(evt.target.checked);
  };

  const totalPrice = getValues('price') - sellerFee;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mt-4">
      <div className="relative z-0 w-full mb-6 group p-4 md:p-0">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Precio de venta{' '}
          {getValues('price') ? (
            <span> {formatCurrency(getValues('price') * 100)}</span>
          ) : (
            ''
          )}
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
      <div className=" flex flex-col md:flex-row gap-2 justify-between items-center mb-2">
        <div className="flex-1">
          <p className="block">
            ¿El envío esta incluido en el precio de venta?
          </p>
        </div>
        <div className="flex-1">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isShippingIncluded}
              onChange={handleCheckboxChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lightPrimary rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-primary"></div>
            <span className="ml-3 text-sm font-medium">
              {isShippingIncluded
                ? 'Envío incluido'
                : 'NO, el comprador paga el envío'}
            </span>
          </label>
        </div>
      </div>

      {getValues('price') >= 50 && (
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
                Se le descontara de los {formatCurrency(totalPrice * 100)},
                entre 20 - 35 Quetzales
              </span>
            </div>
          )}
          <div className="border-t border-gray-300 mt-4"></div>
          <div className="flex justify-between text-black font-bold mt-4">
            <span>Usted recibe</span>
            <span>{formatCurrency(totalPrice * 100)}</span>
          </div>
        </div>
      )}
    </div>
  );
};
