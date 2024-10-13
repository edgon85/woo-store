import { ChangeEvent, useRef } from 'react';
import Swal from 'sweetalert2';

import { addImagesByProductId, deleteProductImage } from '@/actions';
import { CloseIcon, PlusIcon } from '@/components/ui';
import { IProduct, ProductImage } from '@/interfaces';
import { ImageCoverPage } from './ImageCoverPage';
import { toast } from 'react-toastify';
import { compressImages } from '@/utils';

type Props = {
  product: IProduct;
};

export const EditImagesSection = ({ product }: Props) => {
  const productImages: ProductImage[] = product.images.map((resp: any) => ({
    id: resp.id,
    url: resp.url,
    productId: product.id!,
  }));

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const formData = new FormData();

    formData.append('productId', product.id!);
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }
    }

    Swal.fire({
      title: '¿Seguro?',
      text: '¡Deseas agregar estas imágenes!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, Agregar!',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,

      preConfirm: async () => {
        try {
          const files = formData.getAll('images') as File[];
          const compressedFiles = await compressImages(files);
          const cloudinaryImages = await handleImageUpload(compressedFiles);

          if (!cloudinaryImages || cloudinaryImages.length === 0) {
            throw new Error('No se pudieron subir las imágenes');
          }

          const { ok, data, message } = await addImagesByProductId(
            product.id!,
            cloudinaryImages
          );

          if (!ok) {
            throw new Error(message);
          }

          toast.success('Imágenes cargadas con éxito');
          return data;
        } catch (error) {
          Swal.showValidationMessage(`Error: ${(error as Error).message}`);
        }
      },

      allowOutsideClick: () => {
        const popup = Swal.getPopup() as HTMLElement;
        popup.classList.remove('swal2-show');
        return !Swal.isLoading();
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        //     console.log(result.value);
      }
    });
  };

  const addMoreImages = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const deleteImage = (image: ProductImage) => {
    if (product.coverImage === image.url) {
      toast.error('No puedes eliminar la portada del producto');
      return;
    }

    Swal.fire({
      title: '¿Seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, Eliminar!',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,

      preConfirm: async () => {
        const { ok, message } = await deleteProductImage(image);

        if (!ok) {
          Swal.showValidationMessage(`error: ${message}`);
          return;
        }

        return message;
      },
      allowOutsideClick: () => {
        const popup = Swal.getPopup() as HTMLElement;
        popup.classList.remove('swal2-show');
        return !Swal.isLoading();
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        // console.log(result.value);
      }
    });
  };

  const handleImageUpload = async (files: File[]): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append('images', file);

        const response = await fetch('/api/upload-images', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Error al subir la imagen: ${file.name}`);
        }

        const data = await response.json();
        uploadedUrls.push(...data.urls);
      } catch (error) {
        console.error('Error al subir imagen:', error);
        Swal.fire('Error', `No se pudo subir la imagen: ${file.name}`, 'error');
        throw error;
      }
    }
    return uploadedUrls;
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 border-2 border-cerise-red-300 border-dashed rounded-lg p-2">
        {productImages.map((image) => (
          <picture key={image.id} className="relative">
            <img
              src={image.url}
              alt={`Thumbnail ${image}`}
              className="thumbnail mr-2 mb-2"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />

            <button
              onClick={() => deleteImage(image)}
              type="button"
              className="absolute top-1 right-1 flex items-center justify-center bg-cerise-red-600 hover:bg-cerise-red-500 w-6 h-6 p-1 rounded-full"
            >
              <CloseIcon className="text-white" />
            </button>
          </picture>
        ))}
        <input
          type="file"
          className="hidden"
          multiple
          accept="image/png, image/jpeg, image/avif"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        {productImages.length < 10 && (
          <button
            onClick={addMoreImages}
            type="button"
            className="rounded-lg h-20 w-20 flex gap-1 flex-col items-center justify-center border-2 border-cerise-red-300 border-dashed"
          >
            <PlusIcon className="text-cerise-red-700" />
            <p className="text-xs text-gray-500">
              (Quedan {10 - productImages!.length})
            </p>
          </button>
        )}
      </div>
      {/* <ImageCoverPage images={productImages.map((image) => image.url)} /> */}
      <ImageCoverPage
        images={productImages.map((image) => ({
          id: image.id,
          url: image.url,
          productId: product.id!,
        }))}
        coverImage={product.coverImage}
        productId={product.id!}
      />
    </>
  );
};
