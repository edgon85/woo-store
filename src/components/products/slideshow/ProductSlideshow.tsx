'use client';
import React, { useState } from 'react';

import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import {
  Autoplay,
  FreeMode,
  Navigation,
  Thumbs,
  Pagination,
} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './slideshow.css';
import 'swiper/css/pagination';
// Import Lightbox css
import 'yet-another-react-lightbox/styles.css';

import Image from 'next/image';

type Props = {
  title: string;
  images: string[];
  className?: string;
};

export const ProductSlideshow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  return (
    <div className={`${className} h-[50vh] md:h-[70vh] flex flex-col`}>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#000',
            '--swiper-pagination-color': '#c2185b',
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return (
              '<span class="' + className + ' custom-pagination-bullet"></span>'
            );
          },
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay, Pagination]}
        className="flex-1"
      >
        {images.map((image, index) => (
          <SwiperSlide key={`main-${image}`} className="h-full">
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={`${title} - Image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'contain' }}
                className="rounded-lg"
                priority={true}
                onClick={() => {
                  setLightboxIndex(index);
                  setLightboxOpen(true);
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={images.map((src) => ({ src }))}
        index={lightboxIndex}
        plugins={[Zoom]}
      />
    </div>
  );
};
