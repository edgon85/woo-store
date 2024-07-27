/* import { useForm, SubmitHandler } from 'react-hook-form';
import { useCreateProductStore } from './store';
import { FormInputs, IProduct } from './types'; */

import { ProductStatus } from '@/enums';
import { IProduct } from '@/interfaces';
import { useCreateProductStore } from '@/stores';
import { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export type FormInputs = {
  title: string;
  description: string;
  gender: string;
  clothesType: string;
  weight: number;
  price: number;
  images: File[];
};

type ProductFormAction = 'create' | 'edit';

export const useProductForm = (
  action: ProductFormAction,
  initialProduct?: IProduct,
  onSubmitAction?: (
    product: IProduct,
    formImagesData?: FormData
  ) => Promise<void>
) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    setError,
    getValues,
    watch,
    control,
  } = useForm<FormInputs>({
    defaultValues:
      action === 'edit' && initialProduct
        ? {
            title: initialProduct.title,
            description: initialProduct.description,
            gender: initialProduct.measurement.gender,
            clothesType: initialProduct.measurement.clothesType,
            price: initialProduct.price,
            weight: initialProduct.weight,
          }
        : {
            title: '',
            description: '',
            gender: '',
            clothesType: '',
            images: [],
          },
  });

  const {
    category,
    subcategory,
    brand,
    measurement,
    clothesState,
    colors,
    isShippingIncluded,
    resetStore,
    setCategory,
    setSubcategory,
    setBrand,
    setMeasurement,
    setClothesState,
    setColors,
    setIsShippingIncluded,
  } = useCreateProductStore();

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    if (action === 'create' && data.images.length < 2) {
      setError('images', { message: 'seleccione mínimo 2 imágenes' });
      return;
    }

    const formData = new FormData();
    if (action === 'create') {
      data.images.forEach((image) => {
        formData.append('images', image);
      });
    }

    const productData: IProduct = {
      images: [],
      title: data.title,
      description: data.description,
      subcategory: subcategory!,
      brand: brand!,
      price: data.price,
      slug: '',
      colors: [...colors.map((col) => col)],
      measurement: measurement!,
      clothesState: clothesState!,
      status:
        action === 'create' ? ProductStatus.Available : initialProduct!.status,
      weight: data.weight,
      isShippingIncluded,
    };

    if (action === 'edit' && initialProduct) {
      productData.id = initialProduct.id;
    }

    if (onSubmitAction) {
      await onSubmitAction(
        productData,
        action === 'create' ? formData : undefined
      );
    }
  };

  const initializeEditForm = useCallback(
    (product: IProduct) => {
      setCategory(product.category!);
      setSubcategory(product.subcategory);
      setBrand(product.brand);
      setMeasurement(product.measurement);
      setClothesState(product.clothesState);
      setColors(product.colors);
      setIsShippingIncluded(product.isShippingIncluded);
    },
    [
      setBrand,
      setCategory,
      setClothesState,
      setColors,
      setIsShippingIncluded,
      setMeasurement,
      setSubcategory,
    ]
  );

  return {
    register,
    handleSubmit,
    errors,
    isDirty,
    setValue,
    setError,
    getValues,
    watch,
    onSubmit,
    control,
    category,
    subcategory,
    brand,
    measurement,
    clothesState,
    colors,
    isShippingIncluded,
    resetStore,
    initializeEditForm,
    formState: { errors, isDirty },
  };
};
