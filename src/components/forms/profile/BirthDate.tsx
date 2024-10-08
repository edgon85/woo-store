import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { FormProfileData } from './ProfileForm';

type Props = {
  setValue: UseFormSetValue<FormProfileData>;
  getValues: UseFormGetValues<FormProfileData>;
};

export const BirthDate = ({ setValue, getValues }: Props) => {
  return (
    <>
      <label className="flex-1 block text-base font-medium text-gray-700">
        Fecha de nacimiento
      </label>
      <input
        type="date"
        className=" flex-1 w-full p-2 border rounded-md"
        defaultValue={getValues('dateOfBirth') || ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue('dateOfBirth', e.target.value);
          //   console.log(e.target.value); // Aquí puedes manejar la fecha seleccionada
        }}
      />
    </>
  );
};
