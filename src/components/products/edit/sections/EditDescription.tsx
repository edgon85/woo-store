import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormInputs } from '../EditProduct';

type Props = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
};

export const DescriptionSection = ({ register, errors }: Props) => {
  return (
    <div className="relative z-0 w-full mb-6 group">
      <label
        htmlFor="description"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Descripción
      </label>
      <textarea
        id="description"
        rows={4}
        className="block w-full p-4 text-gray-900 border border-divider rounded-md  sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
        placeholder="Cuéntanos más de tu artículo, ¿Tiene algún detalle o imperfecto a destacar? ¿Qué medidas tiene? ¿Cómo queda puesto?..."
        {...register('description', { required: true })}
      />
      {errors.description && (
        <span className="mt-2 text-sm text-red-600">
          Este campo es requerido *
        </span>
      )}
    </div>
  );
};
