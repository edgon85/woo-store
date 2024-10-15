import { updateProduct } from '@/actions';
import { SpinnerIcon } from '@/components/ui';
import { ProductImage } from '@/interfaces';
import React, { useEffect, useState } from 'react';
import Modal from 'react-responsive-modal';
import { toast } from 'react-toastify';

type Props = {
  images: ProductImage[];
  coverImage: string;
  productId: string;
};

export const ImageCoverPage = ({ images, coverImage, productId }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(coverImage);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(selectedImage === coverImage);
  }, [selectedImage, coverImage]);

  const handleSelectCoverImage = (image: string) => {
    setSelectedImage(image);
    // onSelectCoverImage(image);
    // setIsOpenModal(false);
  };
  const closeModal = () => setIsOpenModal(false);

  const onUpdateImage = async () => {
    if (coverImage === selectedImage) {
      return;
    }
    setIsLoading(true);

    const data = { coverImage: selectedImage };
    const { ok, message } = await updateProduct(productId, data);

    if (!ok) {
      toast.error(message);
      setIsLoading(false);
      return;
    }

    toast.success('Portada actualizada!');
    setIsLoading(false);
    closeModal();
  };

  return (
    <>
      <button
        onClick={() => setIsOpenModal(true)}
        type="button"
        className="text-cerise-red-500 border border-cerise-red-500 rounded p-2 mt-4 hover:bg-cerise-red-500 hover:text-white"
      >
        Cambiar portada
      </button>

      <Modal open={isOpenModal} onClose={closeModal} center>
        <div className="w-72 md:w-96 py-4  mt-4">
          <div className="flex flex-wrap items-center gap-2 border-2 border-cerise-red-300 border-dashed rounded-lg p-2">
            {images.map((image: ProductImage) => (
              <picture key={image.id} className="relative">
                <img
                  src={image.url}
                  alt={`Thumbnail ${image.id}`}
                  className={`thumbnail mr-2 mb-2 cursor-pointer ${
                    image.url === selectedImage
                      ? 'border-4 border-cerise-red-500'
                      : ''
                  }`}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                  }}
                  onClick={() => handleSelectCoverImage(image.url)}
                />
              </picture>
            ))}
          </div>

          <button
            onClick={onUpdateImage}
            className={`text-cerise-red-500 border border-cerise-red-500 rounded p-2 mt-4 hover:bg-cerise-red-500 hover:text-white ${
              isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isButtonDisabled}
          >
            {isLoading ? (
              <SpinnerIcon className="w-6 h-6 animate-spin" />
            ) : (
              'Guardar'
            )}
          </button>
        </div>
      </Modal>
    </>
  );
};
