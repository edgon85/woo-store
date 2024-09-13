import { ChangeEvent, useState } from 'react';

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
};

export const PriceSectionEdit = ({
  register,
  errors,
  getValues,
  productId,
}: Props) => {
  /* const setIsShippingIncluded = useCreateProductStore(
    (state) => state.setIsShippingIncluded
  );
  const isShippingIncluded = useCreateProductStore(
    (state) => state.isShippingIncluded
  );

  const handleCheckboxChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setIsShippingIncluded(evt.target.checked);
  }; */

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
      <IsShippingIncluded productId={productId} />
    </div>
  );
};
