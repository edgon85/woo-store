import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FormProfileData } from './ProfileForm';

type Props = {
    setValue: UseFormSetValue<FormProfileData>;
    register: UseFormRegister<FormProfileData>;
};

export const ShowLocationInProfile = ({ setValue, register }: Props) => {
  return (
    <>
      <span className="text-base text-gray-700">
        Mostrar ubicación en el perfil
      </span>
      <div>
        <label className="inline-flex items-center mr-3">
          <input
            type="radio"
            className="form-radio"
            name="mostrarUbicación"
            value="si"
          />
          <span className="ml-2">Sí</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio"
            name="mostrarUbicación"
            value="no"
          />
          <span className="ml-2">No</span>
        </label>
      </div>
    </>
  );
};
