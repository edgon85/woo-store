'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';
import Image from 'next/image';

type Props = {
  title: string;
  images: string[];
  className?: string;
};

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={
          {
            width: '100vw',
            '--swiper-pagination-color': 'var(--primary)',
            // height: '500px'
          } as React.CSSProperties
        }
        pagination
        autoplay={{
          delay: 2500,
        }}
        modules={[FreeMode, Autoplay, Navigation, Pagination]}
        className=""
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={image}
              alt={title}
              width={600}
              height={500}
              className="object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
