import Image from 'next/image';
import React from 'react';
import { BsArrowLeft, BsArrowRight, BsStarFill } from 'react-icons/bs';

export const UserInfo = () => {
  return (
    <section className="flex items-center p-4 bg-white rounded-lg shadow-md">
      <Image
        className="w-16 h-16 rounded-full "
        src="https://via.placeholder.com/150"
        alt="foto de perfil"
        width={64}
        height={64}
      />

      <div className="flex-1 ml-4">
        <h2 className="text-xl font-semibold">Nombre del usuario</h2>

        <div className="flex items-center mt-1">
          <BsStarFill color="gold" />
          (4.3)
        </div>
        <p className="mt-1 text-sm text-gray-500">Quetzaltenango</p>
      </div>

      <button className="text-darkPrimary hover:text-primary ">
        <BsArrowRight size={24} />
      </button>
    </section>
  );
};
