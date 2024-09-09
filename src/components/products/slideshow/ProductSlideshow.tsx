'use client';
import React, { useState } from 'react';

// import { Swiper as SwiperObject } from 'swiper';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
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
import Image from 'next/image';

type Props = {
  title: string;
  images: string[];
  className?: string;
};

export const ProductSlideshow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

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
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/*   <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="h-[200px] thumbs-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={`thumb-${image}`} className="h-[200]">
            <div className="relative w-full h-[200]">
              <Image
                src={image}
                alt={`${title} - Thumbnail ${index + 1}`}
                fill
                sizes="(max-width: 768px) 25vw, (max-width: 1200px) 15vw, 10vw"
                style={{ objectFit: 'contain' }}
                className="rounded-md cursor-pointer"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper> */}
    </div>
  );
};
