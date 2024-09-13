import Link from 'next/link';
import { BtnBuyNow } from './BtnBuyNow';
import { WaveSVG } from '../ui';
import Image from 'next/image';

export const Banner = () => {
  return (
    <div className="relative w-full">
      {/* Contenedor de imagen */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[70vh] overflow-hidden">
        <Image
          src="/main/sarah-brown.jpg"
          alt="Mujer sonriente en un armario"
          className="absolute inset-0 w-full h-full object-cover"
          fill={true}
          priority={true}
        />

        {/* Gradiente superpuesto (visible solo en pantallas md y superiores) */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              'linear-gradient(to right, white, transparent, rgba(0, 0, 0, 0.5))',
          }}
        />

        {/* Contenido centrado verticalmente (visible solo en pantallas md y superiores) */}
        <div className="absolute inset-y-0 left-0 hidden md:flex items-center">
          <div className="p-4 max-w-[20rem] rounded-md bg-white md:ml-[4rem] lg:ml-[12rem] xl:ml-[18rem]">
            <h1 className="text-xl md:text-2xl xl:text-3xl mb-3">
              Convierte tu closet en efectivo
            </h1>
            <BtnBuyNow />
            <Link href="/" className="text-xs text-cerise-red-600">
              ¿Cómo funciona?
            </Link>
          </div>
        </div>
      </div>

      {/* Olas */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        {/*  <div className="md:hidden">
          <WaveComplexSVG />
        </div> */}
        <div className="hidden md:block">
          <WaveSVG />
        </div>
      </div>

      {/* Contenido para pantallas pequeñas (debajo de las olas) */}
      <div className="md:hidden bg-white p-4">
        <div className="max-w-[20rem] flex flex-col items-center mx-auto">
          <h1 className="text-xl mb-3">Convierte tu closet en efectivo</h1>
          <BtnBuyNow />
          <Link href="/" className="text-xs text-cerise-red-600 block mt-2">
            ¿Cómo funciona?
          </Link>
        </div>
      </div>
    </div>
  );
};
