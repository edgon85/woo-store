import Link from 'next/link';
import React from 'react';

export const MenWomanExclusive = () => {
  return (
    <section className="main-wrapper">
      <div className="flex flex-col md:flex-row gap-2 w-full min-h-[50vh] mt-8">
        {/* Women's section */}
        <div className="w-full md:w-1/2 relative overflow-hidden rounded">
          <picture>
            <img
              src="/main/woman.jpeg"
              alt="Woman in black dress"
              className="w-full h-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-6">
            <h2 className="text-white text-3xl font-bold mb-4">
              EXCLUSIVO PARA MUJERES
            </h2>
            <Link
              href={'/catalog/mujer/ropa'}
              className="bg-cerise-red-600 text-white px-6 py-2 w-max rounded hover:bg-cerise-red-500"
            >
              VER MAS
            </Link>
          </div>
        </div>

        {/* Men's section */}
        <div className="w-full md:w-1/2 relative overflow-hidden rounded">
          <picture>
            <img
              src="/main/man.jpeg"
              alt="Woman in black dress"
              className="w-full h-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-6 ">
            <h2 className="text-white text-3xl font-bold mb-4">
              EXCLUSIVO PARA HOMBRES
            </h2>
            <Link
              href={'/catalog/ropa/hombre'}
              className="bg-cerise-red-600 text-white px-6 py-2 w-max rounded hover:bg-cerise-red-500"
            >
              VER MAS
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
