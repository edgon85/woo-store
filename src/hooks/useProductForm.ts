import { ProductStatus } from '@/enums';
import { IProduct } from '@/interfaces';
import { useCreateProductStore } from '@/stores';
import { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

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
    reset,
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
    department,
    municipality,
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
      coverImage: '',
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
      originMunicipality: municipality!,
    };

    if (action === 'edit' && initialProduct) {
      productData.id = initialProduct.id;
    }

    if (onSubmitAction) {
      const validations = [
        { condition: !brand, message: 'Seleccione una marca' },
        { condition: !measurement, message: 'Seleccione una talla' },
        { condition: !colors.length, message: 'Seleccione un color' },
        {
          condition: !clothesState,
          message: 'Seleccione un estado de la prenda',
        },
      ];

      for (const { condition, message } of validations) {
        if (condition) {
          toast.error(message);
          return;
        }
      }

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
    reset,
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
    department,
    municipality,
    resetStore,
    initializeEditForm,
    formState: { errors, isDirty },
  };
};
