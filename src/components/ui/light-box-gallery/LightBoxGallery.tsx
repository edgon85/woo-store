'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
  images: string[];
};

export const LightBoxGallery = ({ images }: Props) => {
  const [lightBoxOpen, setLightBoxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openLightBox = (image: string) => {
    setSelectedImage(image);
    setLightBoxOpen(true);
  };

  const closeLightBox = () => {
    setSelectedImage(null);
    setLightBoxOpen(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          onClick={() => openLightBox(image)}
          className="cursor-pointer"
        >
          <Image
            src={image}
            alt={`Image ${index}`}
            width={300} // Ajusta el ancho de la imagen según tus necesidades
            height={200} // Ajusta la altura de la imagen según tus necesidades
          />
        </div>
      ))}
      {lightBoxOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
          <div className="max-w-screen-lg p-4">
            <Image
              src={selectedImage as string}
              alt="Selected Image"
              width={800}
              height={600}
            />
            <button
              onClick={closeLightBox}
              className="absolute top-4 right-4 bg-white text-black p-2 rounded-full"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
