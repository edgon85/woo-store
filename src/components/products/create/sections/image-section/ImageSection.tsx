import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';

import { FormInputs } from '../../CreateProduct';
import { CloseIcon } from '@/components/ui';

type Props = {
  errors: FieldErrors<FormInputs>;
  setValue: UseFormSetValue<FormInputs>;
};

export const ImageSection = ({ errors, setValue }: Props) => {
  const [thumbnails, setThumbnails] = useState<Set<string>>(new Set());

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const imageFiles: File[] = Array.from(files);

      if (thumbnails.size + imageFiles.length > 10) {
        alert('No puedes agregar más de 10 imágenes en total.');
        return;
      }

      imageFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const imageUrl = e.target?.result as string;
          setThumbnails(
            (prevThumbnails) => new Set([...prevThumbnails, imageUrl])
          );
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const addMoreImages = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeThumbnail = (thumbnailUrl: string) => {
    const updatedThumbnails = Array.from(thumbnails).filter(
      (url) => url !== thumbnailUrl
    );
    setThumbnails(new Set(updatedThumbnails));
  };

  return (
    <>
      <div className="flex items-center justify-center w-full">
        {thumbnails.size === 0 && (
          <div
            onClick={addMoreImages}
            className="flex flex-col items-center justify-center w-full h-52 md:h-64 border-2 border-cerise-red-300 border-dashed rounded-lg cursor-pointer bg-cerise-red-50"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-cerise-red-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-cerise-red-500">
                <span className="font-semibold">Click para subir fotos</span>{' '}
                <span className="hidden md:inline"> o arrastre y suelte</span>
              </p>
              <p className="text-xs text-cerise-red-500">
                PNG, JPEG (MAX. 800x400px)
              </p>
            </div>
          </div>
        )}
        <input
          type="file"
          className="hidden"
          multiple
          accept="image/png, image/jpeg, image/avif"
          // {...register('images')}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
      {thumbnails.size > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-2 border-cerise-red-300 border-dashed rounded-lg p-2">
          {[...thumbnails].map((thumbnail, index) => (
            <picture key={thumbnail} className="relative">
              <img
                src={thumbnail}
                alt={`Thumbnail ${index}`}
                className="thumbnail mr-2 mb-2"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />

              <button
                onClick={() => removeThumbnail(thumbnail)}
                type="button"
                className="absolute top-1 right-1 flex items-center justify-center bg-cerise-red-600 hover:bg-cerise-red-500 w-6 h-6 p-1 rounded-full"
              >
                <CloseIcon size="20" color="#fff" />
              </button>
            </picture>
          ))}

          {thumbnails.size < 10 && (
            <button
              onClick={addMoreImages}
              type="button"
              className="rounded-lg h-20 w-20 flex gap-1 flex-col items-center justify-center border-2 border-cerise-red-300 border-dashed"
            >
              <FaPlus size={24} className="text-cerise-red-700" />
              <p className="text-xs text-gray-500">
                (Quedan {10 - thumbnails.size})
              </p>
            </button>
          )}
        </div>
      )}
    </>
  );
};
