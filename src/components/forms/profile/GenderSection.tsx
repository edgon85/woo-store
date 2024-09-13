import { UseFormSetValue } from 'react-hook-form';
import { FormProfileData } from './ProfileForm';

type Props = {
  setValue: UseFormSetValue<FormProfileData>;
  value: string;
};

export const GenderSection = ({ value, setValue }: Props) => {
  return (
    <div className="flex justify-between items-center py-4">
      <label className="flex-1  block text-base font-medium text-gray-700">
        Genero
      </label>
      <select
        id="customer"
        name="customerId"
        className="flex-1 w-full p-2 border rounded-md"
        defaultValue={value}
        aria-roledescription="customer-error"
        onChange={({ target }) => setValue('gender', target.value)}
      >
        <option value="" disabled>
          Seleccione genero
        </option>
        <option value="female">Mujer</option>
        <option value="male">Hombre</option>
      </select>
    </div>
  );
};
