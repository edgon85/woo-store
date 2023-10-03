import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FormData } from './ProfileForm';

type Props = {
  setValue: UseFormSetValue<FormData>;
  register: UseFormRegister<FormData>;
};

export const GenderSection = ({ setValue, register }: Props) => {
  return (
    <div className="flex justify-between items-center py-4">
      <label className="flex-1  block text-base font-medium text-gray-700">
        Genero
      </label>
      <select
        className=" flex-1 w-full p-2 border rounded-md"
        {...register('gender')}
        onChange={({ target }) => setValue('gender', target.value)}
      >
        <option value="">seleccione genero</option>
        <option value="male">Mujer</option>
        <option value="female">Hombre</option>
      </select>
    </div>
  );
};
