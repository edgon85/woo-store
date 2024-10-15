import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FormProfileData } from './ProfileForm';

type Props = {
  setValue: UseFormSetValue<FormProfileData>;
  register: UseFormRegister<FormProfileData>;
  errors: FieldErrors<FormProfileData>;
};

export const PhoneSection = ({ setValue, register, errors }: Props) => {
  return (
    <div className="">
      <label className="flex-1 text-base font-medium text-gray-700">
        Teléfono
      </label>
      <div className="flex-1">
        <input
          type="tel"
          className="w-full p-2 border rounded-md"
          placeholder="Ingrese 8 dígitos"
          {...register('phone', {
            pattern: {
              value: /^\d{8}$/,
              message: 'Debe contener exactamente 8 dígitos.',
            },
          })}
        />
        {errors.phone && (
          <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>
    </div>
  );
};
