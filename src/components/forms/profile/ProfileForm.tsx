'use client';

import { useForm } from 'react-hook-form';
import { LocationSection } from './LocationSection';
import { ShowLocationInProfile } from './ShowLocationInProfile';
import { BirthDate } from './BirthDate';
import { GenderSection } from './GenderSection';
import { PhoneSection } from './PhoneSection';
import { BiographySection } from './BiographySection';
import { PhotoSection } from './PhotoSection';

export type FormData = {
  photo: string;
  biography: string;
  location: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
};

export const ProfileForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onHandleSubmit = async (formData: FormData) => {
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)}>
      <div className="bg-white p-4 w-full">
        {/* <!-- Tu foto y botón --> */}
        <PhotoSection />
      </div>
      {/* <!-- Divider --> */}
      <hr className="" />

      {/* <!-- Sobre mí --> */}
      <div className="bg-white p-4 w-full flex justify-between">
        <BiographySection register={register} />
      </div>

      {/* <!-- Divider --> */}
      <hr className="" />

      {/* <!-- País --> */}
      <div className="bg-white p-4 w-full ">
        <LocationSection setValue={setValue} register={register} />
      </div>
      {/* <!-- Divider --> */}
      <hr className="" />

      {/* <!-- Mostrar ubicación en el perfil --> */}
      <div className="bg-white flex items-center justify-between p-4">
        <ShowLocationInProfile setValue={setValue} register={register} />
      </div>
      <hr className="" />
      {/* <!-- Mostrar ubicación en el perfil --> */}
      <div className="bg-white flex items-center justify-between p-4 mb-4">
        <BirthDate setValue={setValue} register={register} />
      </div>

      <div className="bg-white p-4 w-full ">
        <GenderSection setValue={setValue} register={register} />
      </div>

      <div className="bg-white p-4 w-full">
        <PhoneSection setValue={setValue} register={register} errors={errors} />
      </div>

      <div className="mt-4 ">
        <button
          type="submit"
          className="bg-primary hover:bg-darkPrimary text-white py-2 p-4 rounded"
        >
          Actualizar perfil
        </button>
      </div>
    </form>
  );
};
