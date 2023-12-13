import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type Props = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

export const TitleSection = ({ register, errors }: Props) => {
  return (
    <div className="relative z-0 w-full mb-6 group">
      <label
        htmlFor="title"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Título
      </label>

      <input
        type="text"
        id="title"
        className="block w-full p-4 text-gray-900 border border-divider rounded-md  sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
        placeholder="Ejemplo: blusa de cuadros H&M"
        {...register('title', { required: true })}
      />
      {errors.title && (
        <span className="mt-2 text-sm text-red-600 dark:text-red-500">
          Este campo es requerido *
        </span>
      )}
    </div>
  );
};