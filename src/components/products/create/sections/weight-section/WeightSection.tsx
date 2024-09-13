import { FormInputs } from '@/hooks';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type Props = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
};

export const WeightSection = ({ register, errors }: Props) => {
  return (
    <div className="py-4 px-4 md:px-0">
      <div className="relative z-0 w-full mb-6 group">
        <label
          htmlFor="product-weight"
          className="block mb-2 text-sm font-medium text-gray-900 flex-1"
        >
          Peso (lbs)
        </label>

        <input
          type="number"
          id="product-weight"
          className="block w-full p-4 text-gray-900 border border-divider rounded-md  sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
          placeholder="Peso aproximado del producto"
          {...register('weight', {
            required: true,
            valueAsNumber: true,
            validate: {
              positive: (value) =>
                value > 0 || 'El peso debe ser un número positivo',
              integer: (value) =>
                Number.isInteger(value) || 'El peso debe ser un número entero',
            },
            min: { value: 1, message: 'El peso debe ser mayor que 0' },
          })}
        />
        {errors.weight && (
          <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>
        )}
      </div>
    </div>
  );
};
