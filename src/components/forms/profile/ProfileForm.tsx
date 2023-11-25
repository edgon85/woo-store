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
import { IProfile } from '@/interfaces';

import Modal from 'react-responsive-modal';
import { AlertComponent, SpinnerIcon } from '@/components/ui';
import { revalidateData, updateProfile } from '@/actions';

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
  fullName: string;
  profile: IProfile;
  userId: string;
};

export const ProfileForm = ({ profile, userId, fullName }: Props) => {
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
    setModalOpen(true);
    const { data, message, error } = await updateProfile({
      ...FormProfileData,
    });

    if (data === null) {
      console.error(message, error);
      setAlertType('error');
      setModalOpen(false);
    } else {
      setAlertType('success');
      revalidateData(
        `/settings/profile/${userId}`,
        `/settings/profile/${userId}`
      );
      setModalOpen(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="bg-white p-4 w-full">
          {/* <!-- Tu foto y botón --> */}
          <PhotoSection
            profile={profile}
            setValue={setValue}
            getValues={getValues}
            fullName={fullName}
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
          <GenderSection value={getValues('gender')} setValue={setValue} />
          {/* <GenderSection value={getValues('gender')} getValues={getValues} /> */}
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
            className="bg-cerise-red-600 hover:bg-cerise-red-500 text-white py-2 p-4 rounded"
          >
            Actualizar perfil
          </button>
        </div>
      </form>

      <Modal open={isModalOpen} onClose={() => {}} center closeIcon={<></>}>
        {/* <div className="w-8 h-8 border-t-4 border-primary border-solid rounded-full animate-spin"></div> */}
        <div className="flex justify-center items-center">
          <SpinnerIcon className="animate-spin" />
        </div>
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
