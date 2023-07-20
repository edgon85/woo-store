'use client';

import { SelectsCategories } from './SelectsCategories';
import { MainModal } from '../ui';
import { useModal } from '@/hooks';

import { IoMdPricetags } from 'react-icons/io';
import { TbRulerMeasure } from 'react-icons/tb';
import { ItemCreate } from './ItemCreate';
import { BrandSelect } from './create/BrandSelect';
import { useState } from 'react';
import { IBrand } from '@/interfaces';

export const CreateProduct = () => {
  const { onOpenModal } = useModal();

  const [brand, setBrand] = useState<IBrand | null>(null);

  return (
    <div className="w-full max-w-2xl p-4">
      <h2 className="text-2xl font-extrabold mb-4">Subir articulo nuevo</h2>
      <form>
        <div className="bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Título
            </label>

            <input
              type="text"
              id="title"
              className="block w-full p-4 text-gray-900 border border-divider rounded-md  sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
              placeholder="Ejemplo: blusa de cuadros H&M"
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Descripción
            </label>
            <textarea
              name="floating_password"
              id="floating_password"
              rows={4}
              className="block w-full p-4 text-gray-900 border border-divider rounded-md  sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
              placeholder="Cuéntanos más de tu artículo, ¿Tiene algún detalle o imperfecto a destacar? ¿Qué medidas tiene? ¿Cómo queda puesto?..."
            />
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mt-4">
          <SelectsCategories />
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mt-4">
          <ItemCreate
            title="Marca"
            icon={IoMdPricetags}
            value={`${brand?.name !== undefined ? brand?.name : ''}`}
            onClick={() => onOpenModal('brand')}
          />
          <ItemCreate
            title="Talla"
            icon={TbRulerMeasure}
            value=""
            onClick={() => onOpenModal('talla')}
          />
          {
            <MainModal
              modalId="brand"
              title="Seleccione marca"
              body={<BrandSelect setBrand={setBrand} brandSelectedId={brand?.id!} />}
            />
          }
          {<MainModal modalId="talla" body={<>Modal de talla</>} />}
        </div>
      </form>
    </div>
  );
};
