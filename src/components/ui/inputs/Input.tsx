import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type Props = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

const Input = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
}: Props) => {
  <div className="relative z-0 w-full mb-6 group">
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {label}
    </label>

    <input
      disabled={disabled}
      type={type}
      id={id}
      className="block w-full p-4 text-gray-900 border border-divider rounded-md  sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
      placeholder="Ejemplo: blusa de cuadros H&M"
      {...register('title', { required })}
    />
    {errors[id] && (
      <span className="mt-2 text-sm text-red-600 dark:text-red-500">
        Este campo es requerido *
      </span>
    )}
  </div>;
};

export default Input;
