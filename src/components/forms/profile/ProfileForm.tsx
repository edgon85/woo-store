'use client';

import { useForm } from 'react-hook-form';
import { LocationSection } from './LocationSection';
import { ShowLocationInProfile } from './ShowLocationInProfile';
import { BirthDate } from './BirthDate';
import { GenderSection } from './GenderSection';
import { PhoneSection } from './PhoneSection';
import { BiographySection } from './BiographySection';
import { PhotoSection } from './PhotoSection';
import { IProfile, IUser } from '@/interfaces';
import { updateProfile } from '@/helpers';

export type FormData = {
  id: string;
  photo: string;
  biography: string;
  location: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
};

type Props = {
  profile: IProfile;
  token: string;
};

export const ProfileForm = ({ profile, token }: Props) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: profile });

  // console.log(profile);
  const onHandleSubmit = async (formData: FormData) => {
    // console.log(profile);
    await updateProfile(token, { ...formData }).then((resp) => {
      /* if (resp.data === null) {
        throw new Error('Ocurrió un error');
      } */
      console.log('se actualizo correctamente');
      console.log(resp);
    });
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
        <BirthDate setValue={setValue} getValues={getValues} />
      </div>

      <div className="bg-white p-4 w-full ">
        <GenderSection setValue={setValue} getValues={getValues} />
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
