'use client';
import {
  IBrand,
  IClothesState,
  IColor,
  IProduct,
  ProductImage,
} from '@/interfaces';
import { SubmitHandler, useForm } from 'react-hook-form';
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
  CustomModal,
  MeasurementSection,
  PriceSection,
  SubcategorySection,
  WeightSection,
} from '../create/sections';
import { useEffect, useState } from 'react';
import { updateProduct } from '@/actions';
import { toast } from 'react-toastify';
import { FormInputs, useProductForm, useUnsavedChangesWarning } from '@/hooks';
import { Button, SpinnerIcon } from '@/components/ui';

type Props = {
  product: IProduct & { ProductImage?: ProductImage[] };
  brands: IBrand[];
  clothingConditionList: IClothesState[];
  colors: IColor[];
};

export const EditProduct = ({
  product,
  brands,
  clothingConditionList,
  colors: colorList,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
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
      <h2 className="text-2xl font-extrabold mb-4">Editar articulo</h2>
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
          <PriceSection
            register={register}
            getValues={getValues}
            errors={errors}
          />
        ) : null}
        {/* ····························································· */}

        {watch('price') ? (
          <div className="mt-4">
            <Button
              label={isLoading ? '' : 'Guardar'}
              icon={
                isLoading ? (
                  <SpinnerIcon className="w-6 h-6 animate-spin text-white" />
                ) : (
                  <></>
                )
              }
              type="submit"
              disabled={!isDirty}
            />
          </div>
        ) : null}
      </form>
      <CustomModal />
    </div>
  );
};
{
  /* <SpinnerIcon className="w-6 h-6 animate-spin" /> */
}
