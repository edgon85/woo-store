import { WeightIcon } from '@/components';
import { FormInputs } from '@/hooks';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type Props = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
};

export const WeightSection = ({ register, errors }: Props) => {
  return (
    <div className="py-4 px-4 md:px-0">
      <div className="flex items-center justify-between w-full">
        <label
          htmlFor="product-weight"
          className="text-sm font-medium text-gray-900 whitespace-nowrap flex gap-1 items-center"
        >
          <WeightIcon className="w-6 h-6 text-gray-500" />
          Peso:
        </label>

        <div className="">
          <select
            id="product-weight"
            defaultValue=""
            className="block w-full p-2 text-gray-900 border border-divider rounded-md sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
            {...register('weight', {
              required: true,
              valueAsNumber: true,
            })}
          >
            <option value="" disabled>
              - Seleccione peso -
            </option>
            {[...Array(10)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1} {index === 0 ? 'libra' : 'libras'}
              </option>
            ))}
          </select>

          {errors.weight && (
            <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};
