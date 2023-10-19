import { wooLocalApi } from '@/wooApi';
import { ChangeEvent, useRef, useState } from 'react';
// import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

import { updatePhotoProfile } from '@/helpers';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { FormProfileData } from './ProfileForm';
import Modal from 'react-responsive-modal';
import { AlertComponent } from '@/components/ui';

type Props = {
  setValue: UseFormSetValue<FormProfileData>;
  getValues: UseFormGetValues<FormProfileData>;
  fullName: string;
  profileId: string;
  token: string;
};
export const PhotoSection = ({
  profileId,
  token,
  fullName,
  setValue,
  getValues,
}: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | ''>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const iniciales = fullName
    .split(' ')
    .map((palabra) => palabra.charAt(0))
    .join('')
    .toUpperCase();

  const handleChoosePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    // target.preventDefault();
    if (!target.files || target.files.length === 0) {
      return;
    }

    const file = target.files?.[0];
    if (file) {
      setModalOpen(true);
      const formData = new FormData();
      formData.set('file', file);

      try {
        const { data } = await wooLocalApi.post('/profile/upload', formData);
        const { message } = data;
        await updatePhotoUrl(message);

        setAlertType('success');
      } catch (error) {
        console.error('Error subiendo la imagen:', error);

        setAlertType('error');
      } finally {
        setModalOpen(false);
      }
    }
  };

  const updatePhotoUrl = async (urlToUpdate: string) => {
    await updatePhotoProfile(profileId, token, urlToUpdate).then((resp) => {
      setValue('profileImage', urlToUpdate, { shouldValidate: true });
      // console.log(resp);
    });
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium text-gray-700">Tu foto</h3>
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center overflow-hidden bg-gray-200 rounded-full mr-4">
            {getValues('profileImage') !== null ? (
              <picture>
                <img src={getValues('profileImage')} alt="imagen de perfil" />
              </picture>
            ) : (
              <>
                <span className="w-16 h-16 flex justify-center items-center rounded-full bg-lightPrimary font-bold">
                  {iniciales}
                </span>
              </>
            )}
          </div>
          <button
            onClick={handleChoosePhotoClick}
            type="button"
            className="border border-primary text-primary hover:bg-gray-200 px-4 py-2 rounded"
          >
            Elegir foto
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            // {...register('photo')}
          />
        </div>
      </div>
      <Modal open={isModalOpen} onClose={() => {}} center closeIcon={<></>}>
        <div className="w-8 h-8 border-t-4 border-primary border-solid rounded-full animate-spin"></div>
      </Modal>

      {alertType === 'success' && (
        <AlertComponent
          type="success"
          message="¡Tu imagen ha sido actualizada!"
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
