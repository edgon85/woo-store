'use client';
import {
  IBrand,
  IClothesState,
  IColor,
  IProduct,
  ProductImage,
} from '@/interfaces';
import { SubmitHandler } from 'react-hook-form';
import {
  DescriptionSection,
  EditImagesSection,
  EditTitleSection,
  StatusSection,
} from './sections';
import {
  BrandSection,
  CategorySection,
  ClothesStateSection,
  ColorsSection,
  MeasurementSection,
  SubcategorySection,
  WeightSection,
} from '../create/sections';
import { useEffect, useState } from 'react';
import { updateProduct } from '@/actions';
import { toast } from 'react-toastify';
import { FormInputs, useProductForm, useUnsavedChangesWarning } from '@/hooks';
import { SpinnerIcon } from '@/components/ui';
import { PriceSectionEdit } from './sections/price-section/PriceSection';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = {
  product: IProduct & { ProductImage?: ProductImage[] };
  brands: IBrand[];
  clothingConditionList: IClothesState[];
  colors: IColor[];
  sellerFee: number;
};

export const EditProduct = ({
  product,
  brands,
  clothingConditionList,
  colors: colorList,
  sellerFee,
}: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    isDirty,
    getValues,
    watch,
    initializeEditForm,
    subcategory: subcategoryState,
    brand: brandState,
    measurement: measurementState,
    clothesState: clothesStateState,
    colors: colorState,
    isShippingIncluded,
  } = useProductForm('edit', product);

  useUnsavedChangesWarning(isDirty);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    initializeEditForm(product);
  }, [product, initializeEditForm]);

  const onHandleSubmit: SubmitHandler<FormInputs> = async (
    dataForm: FormInputs
  ) => {
    setIsLoading(true);

    const dataToUpdate = {
      title: dataForm.title,
      description: dataForm.description,
      subcategory: subcategoryState?.id,
      brand: brandState,
      measurement: measurementState,
      clothesState: clothesStateState,
      colors: colorState,
      price: dataForm.price,
      weight: dataForm.weight,
      isShippingIncluded,
    };

    const { ok, data, message } = await updateProduct(
      product.id!,
      dataToUpdate
    );

    ok ? toast.success(data?.message) : toast.error(message);
    setIsLoading(false);
    reset();
  };

  watch('weight');
  watch('price');

  return (
    <div className="w-full max-w-2xl px-2 md:px-0">
      <div className="flex justify-between items-center mb-4">
        <Link
          href={`/product/${product.slug}`}
          className="text-2xl font-extrabold hover:text-cerise-red-600"
        >
          Editar articulo
        </Link>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => router.replace(`/product/${product.slug}`)}
            className="bg-white hover:bg-cerise-red-300 text-primary text-xs rounded border flex justify-center items-center px-2 py-1"
          >
            Ver detalle
          </button>
          <button
            onClick={() => router.replace(`/member/${product.user?.username}`)}
            className=" bg-cerise-red-600 hover:bg-cerise-red-700 text-white text-xs rounded flex justify-center items-center px-2 py-1"
          >
            Ver mi closet
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="bg-white border rounded shadow p-4 md:p-8 mb-2 md:mb-4">
          <EditImagesSection product={product} />
        </div>
        <div className="bg-white border rounded shadow  p-6 md:p-8 ">
          <EditTitleSection register={register} errors={errors} />
          <DescriptionSection register={register} errors={errors} />
        </div>
        <div className="bg-white border rounded shadow  p-6 md:p-8 mt-4">
          <StatusSection
            productId={product.id!}
            productStatus={product.status}
          />
        </div>
        <div className="bg-white rounded-lg shadow sm:p-6 md:p-8 mt-4">
          <CategorySection
            gender={getValues('gender')}
            clothesType={getValues('clothesType')}
          />
          <SubcategorySection />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mt-4">
          <BrandSection brands={brands} />
          <MeasurementSection
            gender={getValues('gender')}
            clothesType={getValues('clothesType')}
          />
          <ClothesStateSection clothingConditionList={clothingConditionList} />
          <ColorsSection colors={colorList} />
          {/* ····························································· */}
          {<WeightSection register={register} errors={errors} />}
        </div>

        {/* ····························································· */}
        {getValues('weight') ? (
          <PriceSectionEdit
            register={register}
            getValues={getValues}
            errors={errors}
            productId={product.id!}
            sellerFee={sellerFee}
          />
        ) : null}
        {/* ····························································· */}

        {watch('price') ? (
          <div className="mt-4">
            <button
              type="submit"
              disabled={!isDirty}
              className="w-full bg-gradient-to-r from-cerise-red-500 to-cerise-red-600 hover:bg-gradient-to-br hover:from-cerise-red-600 hover:to-cerise-red-700 text-white text-sm rounded flex justify-center items-center py-2 mt-2 disabled:opacity-70"
            >
              {isLoading ? (
                <SpinnerIcon className="w-6 h-6 animate-spin text-white" />
              ) : (
                <></>
              )}
              {isLoading ? '' : 'Guardar'}
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
};
