import { wooLocalApi } from '@/wooApi';
import { ChangeEvent, useRef } from 'react';
// import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

import { updatePhotoProfile } from '@/helpers';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { FormProfileData } from './ProfileForm';

type Props = {
  setValue: UseFormSetValue<FormProfileData>;
  getValues: UseFormGetValues<FormProfileData>;
  profileId: string;
  token: string;
};
export const PhotoSection = ({
  profileId,
  token,
  setValue,
  getValues,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      const formData = new FormData();
      formData.set('file', file);
      const { data } = await wooLocalApi.post('/profile/upload', formData);
      const { message } = data;
      await updatePhotoUrl(message);
    }
  };

  const updatePhotoUrl = async (urlToUpdate: string) => {
    await updatePhotoProfile(profileId, token, urlToUpdate).then((resp) => {
      setValue('profileImage', urlToUpdate, { shouldValidate: true });
      // console.log(resp);
    });
  };

  return (
    <div className="flex justify-between items-center">
      <h3 className="text-base font-medium text-gray-700">Tu foto</h3>
      <div className="flex justify-center items-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full mr-4">
          <picture>
            <img src={getValues('profileImage')} alt="imagen de perfil" />
          </picture>
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
  );
};
