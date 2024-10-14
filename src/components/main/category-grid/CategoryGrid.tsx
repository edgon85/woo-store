import Link from 'next/link';
import React from 'react';

export const CategoryGrid = () => {
  const sections = [
    {
      title: 'COLECCIÓN FEMENINA',
      subtitle: '#MUJERES',
      description: 'Vestidos, Pantalones, Blusas y más',
      imagePath: '/main/fashion.webp',
      gridClass: 'col-span-full md:col-span-1 md:row-span-2',
      link: '/catalog/mujer/ropa',
    },
    {
      title: 'MODA MASCULINA',
      subtitle: '#HOMBRES',
      description: 'Pantalones, Camisas, Sudaderas y más',
      imagePath: '/main/man-2.jpg',
      gridClass: 'col-span-full md:col-span-1',
      link: '/catalog/hombre/ropa',
    },
    {
      title: 'ZAPATOS',
      subtitle: '#CALZADO',
      description: 'Para Ella',
      imagePath: '/main/shoes-woman.jpg',
      gridClass: 'col-span-full md:col-span-1',
      link: '/catalog/mujer/zapatos',
    },
    {
      title: 'ZAPATOS',
      subtitle: '#CALZADO',
      description: 'PARA EL',
      imagePath: '/main/shoes-man.jpg',
      gridClass: 'col-span-full md:col-span-1',
      link: '/catalog/hombre/zapatos',
    },
    {
      title: 'COMPLEMENTOS',
      subtitle: '#ACCESORIOS',
      description: 'Bolsos, Cinturones, gorros',
      imagePath: '/main/cinturones.jpg',
      gridClass: 'col-span-full md:col-span-1',
      link: '/catalog/mujer/accesorios',
    },
  ];

  return (
    <section className="main-wrapper px-4 lg:px-0">
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-[70vh] md:h-[calc(70vh-2rem)]">
        {sections.map((section, index) => (
          <Link
            href={section.link}
            key={index}
            className={`relative overflow-hidden ${section.gridClass} group`}
          >
            <div
              style={{
                backgroundImage: `url(${section.imagePath})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              className="absolute inset-0 transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-50" />
            <div className="relative z-10 p-4 h-full flex flex-col justify-end">
              <p className="text-white text-sm font-semibold">
                {section.subtitle}
              </p>
              <h2 className="text-white text-2xl md:text-3xl font-bold">
                {section.title}
              </h2>
              <p className="text-white text-sm mt-2">{section.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
