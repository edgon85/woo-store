'use client';

import { useState } from 'react';
import { IoMdPricetags } from 'react-icons/io';
import { TbRulerMeasure } from 'react-icons/tb';
import { BsCheck2Circle, BsDropletHalf } from 'react-icons/bs';

import { useModal } from '@/hooks';
import { measurementFormat } from '@/utils';
import {
  IBrand,
  IClotesSize,
  IClothesState,
  IColor,
  IProduct,
} from '@/interfaces';

import { Button, MainModal } from '../ui';
import { ItemCreate } from './ItemCreate';
import { SelectsCategories } from './SelectsCategories';
import {
  BrandSelect,
  ClothesState,
  ColorSelect,
  Measurements,
  NumberInput,
} from './create';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

export const CreateProduct = () => {
  const { onOpenModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const [clothesData, setClothesData] = useState({
    gender: '',
    clothesType: '',
    category: '',
    subCategory: '',
  });
  const [brand, setBrand] = useState<IBrand | null>(null);
  const [talla, setTalla] = useState<IClotesSize | null>({
    id: 0,
    size: '',
    slug: '',
  });
  const [clothesState, setClothesState] = useState<IClothesState | null>(null);
  const [color, setColor] = useState<IColor[]>([]);
  const [price, setPrice] = useState<number>(0);

  const onHandleSubmit: SubmitHandler<FieldValues> = (data) => {
    const newProduct: IProduct = {
      images: ['', ''],
      title: data.title,
      description: data.description,
      gender: clothesData.gender,
      type: clothesData.clothesType,
      category: clothesData.category,
      subcategory: clothesData.subCategory,
      brand: brand?.id!,
      size: talla?.id!,
      state: clothesState?.id!,
      color: color,
      price: price,
      slug: '',
      user: '',
      available: true,
    };

    console.log(newProduct);
  };

  return (
    <div className="w-full max-w-2xl p-4">
      <h2 className="text-2xl font-extrabold mb-4">Subir articulo nuevo</h2>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
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
              {...register('title', { required: true })}
            />
            {errors.title && (
              <span className="mt-2 text-sm text-red-600 dark:text-red-500">
                Este campo es requerido *
              </span>
            )}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Descripción
            </label>
            <textarea
              id="description"
              rows={4}
              className="block w-full p-4 text-gray-900 border border-divider rounded-md  sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
              placeholder="Cuéntanos más de tu artículo, ¿Tiene algún detalle o imperfecto a destacar? ¿Qué medidas tiene? ¿Cómo queda puesto?..."
              {...register('description', { required: true })}
            />
            {errors.description && (
              <span className="mt-2 text-sm text-red-600 dark:text-red-500">
                Este campo es requerido *
              </span>
            )}
          </div>
        </div>
        {
          <div className="bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mt-4">
            <SelectsCategories setClothesData={setClothesData} />
          </div>
        }
        {clothesData.subCategory && (
          <div className="bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mt-4">
            <ItemCreate
              title="Marca"
              icon={IoMdPricetags}
              value={`${brand?.title !== undefined ? brand?.title : ''}`}
              onClick={() => onOpenModal('brand')}
            />
            {clothesData.category &&
            clothesData.clothesType !== 'accesorios' ? (
              <ItemCreate
                uppercase
                title="Talla"
                icon={TbRulerMeasure}
                value={
                  talla?.size !== 'unica'
                    ? measurementFormat(clothesData.category, talla!)
                    : 'única'
                }
                onClick={() => onOpenModal('talla')}
              />
            ) : null}

            <ItemCreate
              title="Estado"
              icon={BsCheck2Circle}
              value={clothesState?.title!}
              onClick={() => onOpenModal('clothes-state')}
            />

            <ItemCreate
              title="Color"
              icon={BsDropletHalf}
              value={
                color?.length === 2
                  ? `${color[0].name} y ${color[1].name}`
                  : `${color?.length === 0 ? '' : color[0].name}`
              }
              onClick={() => onOpenModal('color')}
            />

            <MainModal
              modalId="color"
              title="Color de la prenda"
              body={<ColorSelect setColor={setColor} colorSelect={color!} />}
            />

            <MainModal
              modalId="clothes-state"
              title="Estado de la prenda o accesorio"
              body={
                <ClothesState
                  setClothesState={setClothesState}
                  clothesSelected={clothesState?.id!}
                />
              }
            />

            <MainModal
              modalId="brand"
              title="Seleccione marca"
              body={
                <BrandSelect setBrand={setBrand} branSelectedId={brand?.id!} />
              }
            />

            <MainModal
              modalId="talla"
              body={
                <Measurements
                  gender={clothesData.gender}
                  typeOfClothes={clothesData.clothesType}
                  category={clothesData.category}
                  setTalla={setTalla}
                />
              }
            />
          </div>
        )}

        {color.length !== 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mt-4">
            <NumberInput setPrice={setPrice} />
          </div>
        ) : null}

        {price !== 0 ? (
          <div className="mt-4">
            <Button label="Publicar" type="submit" />
          </div>
        ) : null}
      </form>
    </div>
  );
};
