import { UseFormRegister } from 'react-hook-form';
import { FormProfileData } from './ProfileForm';

type Props = {
  register: UseFormRegister<FormProfileData>;
};

export const BiographySection = ({ register }: Props) => {
  return (
    <>
      <label
        htmlFor="sobreMi"
        className="flex-1 block text-base font-medium text-gray-700"
      >
        Sobre mí
      </label>
      <textarea
        id="sobreMi"
        rows={3}
        className=" flex-1 w-full p-2 border rounded-md resize-none"
        placeholder="Cuéntanos más sobre ti"
        {...register('biography')}
      ></textarea>
    </>
  );
};
