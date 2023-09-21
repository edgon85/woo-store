'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import { useSwipeable } from 'react-swipeable';
import Modal from 'react-responsive-modal';

import { Carousel } from 'react-responsive-carousel';
import { relative } from 'path';

type Props = {
  images: string[];
};

export const ImageSlider = ({ images }: Props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextImage(),
    onSwipedRight: () => prevImage(),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const customModalStyles = {
    modal: {
      width: '90%', // Limita el ancho del modal al 90% del ancho de la pantalla
      height: '90vh', // Establece la altura del modal
    },
  };

  const renderCustomArrowPrev = (
    clickHandler: () => void,
    hasPrev: boolean,
    label: string
  ) => (
    <div
      className={`custom-arrow custom-arrow-prev${hasPrev ? '' : ' disabled'}`}
      onClick={clickHandler}
    >
      &#9664; {/* Flecha hacia la izquierda */}
    </div>
  );

  const renderCustomArrowNext = (
    clickHandler: () => void,
    hasNext: boolean,
    label: string
  ) => (
    <div
      className={`custom-arrow custom-arrow-next${hasNext ? '' : ' disabled'}`}
      onClick={clickHandler}
    >
      &#9654; {/* Flecha hacia la derecha */}
    </div>
  );

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div {...handlers} className="">
        <div
          className="relative w-full  min-h-[600px] overflow-hidden"
          onClick={() => setLightboxIsOpen(true)}
        >
          <Image
            src={images[currentImage]}
            alt="Slider"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            // className="transition-transform duration-500 ease-in-out transform scale-100 hover:scale-105"
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
      </div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-300 hover:bg-gray-500 text-white"
        onClick={prevImage}
      >
        <IoMdArrowDropleft size={32} />
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-300 hover:bg-gray-500 text-white"
        onClick={nextImage}
      >
        <IoMdArrowDropright size={32} />
      </button>
      <Modal
        open={lightboxIsOpen}
        onClose={() => setLightboxIsOpen(false)}
        styles={customModalStyles}
      >
        <Carousel
          selectedItem={currentImage}
          onChange={(index) => setCurrentImage(index)}
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          useKeyboardArrows={true}
          renderArrowPrev={renderCustomArrowPrev}
          renderArrowNext={renderCustomArrowNext}
          // showArrows={ false}
        >
          {images.map((image, index) => {
            return (
              <div key={index}>
                <div className="relative w-full h-[85vh] overflow-hidden">
                  <Image
                    src={image}
                    alt="Slider"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{
                      objectFit: 'contain',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </Carousel>
      </Modal>
    </div>
  );
};
