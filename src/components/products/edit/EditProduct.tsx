'use client';
import { IBrand, IClothesState, IColor, IProduct } from '@/interfaces';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  DescriptionSection,
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
  PackageDeliverySection,
  SubcategorySection,
} from '../create/sections';
import { useCreateProductStore } from '@/stores';
import { useEffect, useState } from 'react';
import { IPackageDelivery } from '@/lib';
import { updateProduct } from '@/actions';
import { AlertComponent } from '@/components/ui';

type Props = {
  product: IProduct;
  packageDeliveriesData: IPackageDelivery[];
  brands: IBrand[];
  clothingConditionList: IClothesState[];
  colors: IColor[];
};

export type FormInputs = {
  title: string;
  description: string;
  gender: string;
  clothesType: string;
  price: number;
};

export const EditProduct = ({
  product,
  packageDeliveriesData,
  brands,
  clothingConditionList,
  colors: colorList,
}: Props) => {
  const [alertType, setAlertType] = useState<'success' | 'error' | ''>('');

  const setCategory = useCreateProductStore((state) => state.setCategory);
  const setSubCategory = useCreateProductStore((state) => state.setSubcategory);
  const setBrand = useCreateProductStore((state) => state.setBrand);
  const setMeasurement = useCreateProductStore((state) => state.setMeasurement);
  const setClothesState = useCreateProductStore(
    (state) => state.setClothesState
  );
  const setColors = useCreateProductStore((state) => state.setColors);
  const setPrice = useCreateProductStore((state) => state.setPrice);
  const setPackagesDeliveries = useCreateProductStore(
    (state) => state.setPackageDeliveries
  );

  const subcategoryState = useCreateProductStore((state) => state.subcategory);
  const brandState = useCreateProductStore((state) => state.brand);
  const measurementState = useCreateProductStore((state) => state.measurement);
  const clothesStateState = useCreateProductStore(
    (state) => state.clothesState
  );
  const colorState = useCreateProductStore((state) => state.colors);
  const packagesDeliveriesState = useCreateProductStore(
    (state) => state.packageDeliveries
  );

  const {
    title,
    description,
    measurement,
    category,
    subcategory,
    brand,
    clothesState,
    colors,
    price,
    packageDelivery,
  } = product;
  const { gender, clothesType } = measurement;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    getValues,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      title,
      description,
      gender,
      clothesType,
      price,
    },
  });

  useEffect(() => {
    setCategory(category!);
    setSubCategory(subcategory);
    setBrand(brand);
    setMeasurement(measurement);
    setClothesState(clothesState);
    setColors(colors);
    setPrice(price);
    setPackagesDeliveries(packageDelivery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHandleSubmit: SubmitHandler<FormInputs> = async (
    data: FormInputs
  ) => {
    const dataToUpdate = {
      title: data.title,
      description: data.description,
      subcategory: subcategoryState?.id,
      brand: brandState,
      measurement: measurementState,
      clothesState: clothesStateState,
      colors: colorState,
      packageDelivery: [...packagesDeliveriesState.map((resp) => resp.id)],
      price: data.price,
    };

    const { ok } = await updateProduct(product.id!, dataToUpdate);
    setAlertType(ok ? 'success' : 'error');
  };

  return (
    <div className="w-full max-w-2xl px-2 md:px-0">
      <h2 className="text-2xl font-extrabold mb-4">Editar articulo</h2>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
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
          <CategorySection gender={gender!} clothesType={clothesType!} />
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
          <PackageDeliverySection data={packageDeliveriesData} />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mt-4">
          <div className="relative z-0 w-full mb-6 group p-4 md:p-0">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Precio de venta{' '}
            </label>

            <input
              id="price"
              type="number"
              // value={value}
              className="block w-full p-4 text-gray-900 border border-divider rounded-md  sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
              placeholder="¿A qué precio lo vendes?"
              {...register('price', {
                required: 'Este campo es requerido',
                valueAsNumber: true,
                min: 0,
              })}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 border border-cerise-red-600 hover:bg-cerise-red-50 text-cerise-red-600 w-full py-4 rounded"
        >
          Actualizar
        </button>
      </form>
      <CustomModal />
      {alertType === 'success' && (
        <AlertComponent
          type="success"
          message="¡Producto actualizado!"
          onDismiss={() => setAlertType('')}
        />
      )}
      {alertType === 'error' && (
        <AlertComponent
          type="error"
          message="Ocurrió un error al actualizar"
          onDismiss={() => setAlertType('')}
        />
      )}
    </div>
  );
};
