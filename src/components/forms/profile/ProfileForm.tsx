'use client';
import { useState } from 'react';

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
import Modal from 'react-responsive-modal';
import { AlertComponent } from '@/components/ui';

export type FormProfileData = {
  id: string;
  profileImage: string;
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
  const [isModalOpen, setModalOpen] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | ''>('');
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormProfileData>({ defaultValues: profile });

  const onHandleSubmit = async (FormProfileData: FormProfileData) => {
    // console.log(profile);

    setModalOpen(true);
    try {
      await updateProfile(token, { ...FormProfileData });
      setAlertType('success');
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      setAlertType('error');
    } finally {
      setModalOpen(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="bg-white p-4 w-full">
          {/* <!-- Tu foto y botón --> */}
          <PhotoSection
            profileId={profile.id}
            token={token}
            setValue={setValue}
            getValues={getValues}
          />
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
          <PhoneSection
            setValue={setValue}
            register={register}
            errors={errors}
          />
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

      <Modal open={isModalOpen} onClose={() => {}} center closeIcon={<></>}>
        <div className="w-8 h-8 border-t-4 border-primary border-solid rounded-full animate-spin"></div>
      </Modal>
      {alertType === 'success' && (
        <AlertComponent
          type="success"
          message="¡Tu perfil ha sido actualizada!"
          onDismiss={() => setAlertType('')}
        />
      )}
      {alertType === 'error' && (
        <AlertComponent
          type="error"
          message="Ocurrió un error al actualizar."
          onDismiss={() => setAlertType('')}
        />
      )}
    </>
  );
};
