'use client';

import { useAuth } from '@/hooks';
import { IBrand, IClothesState, IColor, IProduct } from '@/interfaces';

import { Button } from '../../ui';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { createProduct } from '@/helpers/httpHelper';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

import { useCreateProductStore } from '@/stores';
import {
  CustomModal,
  ClothesTypeSection,
  CategorySection,
  TitleSection,
  DescriptionSection,
  GenderSection,
  SubcategorySection,
  BrandSection,
  MeasurementSection,
  ClothesStateSection,
  ColorsSection,
  PriceSection,
  PackageDeliverySection,
  ImageSection,
} from './sections';
import { IPackageDelivery } from '@/lib';

export type FormInputs = {
  title: string;
  description: string;
  gender: string;
  clothesType: string;

  images?: FileList;
};

type Props = {
  packageDeliveriesData: IPackageDelivery[];
  brands: IBrand[];
  clothingConditionList: IClothesState[];
  colors: IColor[];
};

export const CreateProduct = ({
  packageDeliveriesData,
  brands,
  clothingConditionList,
  colors,
}: Props) => {
  const { user } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      title: '',
      description: '',
      gender: '',
      clothesType: '',

      images: undefined,
    },
  });

  // const gender = useCreateProductStore((state) => state.gender);
  // const clothesType = useCreateProductStore((state) => state.clothesType);
  const category = useCreateProductStore((state) => state.category);
  const subcategory = useCreateProductStore((state) => state.subcategory);
  const brand = useCreateProductStore((state) => state.brand);
  const measurement = useCreateProductStore((state) => state.measurement);
  const clothesState = useCreateProductStore((state) => state.clothesState);
  const color = useCreateProductStore((state) => state.colors);
  const price = useCreateProductStore((state) => state.price);
  const packagesDeliveries = useCreateProductStore(
    (state) => state.packageDeliveries
  );

  const onHandleSubmit: SubmitHandler<FormInputs> = (data) => {
    /* const newProduct: IProduct = {
      images: [
        'https://picsum.photos/400/600',
        'https://picsum.photos/400/600',
      ],
      title: data.title,
      description: data.description,
      subcategory: subcategory!,
      brand: brand!,
      price: price,
      slug: '',
      colors: [...color.map((col) => col.id)],
      measurement: measurement!,
      clothesState: clothesState!,
      status: 'Available',
      packageDelivery: [...packagesDeliveries.map((resp) => resp.id)],
    }; */

    console.log(data.images);

    // onCreateNewProduct(newProduct, user!.token);
  };

  const onCreateNewProduct = async (product: IProduct, token: string) => {
    Swal.fire({
      title: '¿Estás seguro?',
      html: `Se va a crear un nuevo producto`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, crear',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const { message, data } = await createProduct(product, token);
        if (message !== 'ok') {
          Swal.showValidationMessage(`error: ${message}`);
          return;
        }

        return data;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.title} creado`,
          icon: 'success',
        });
        router.replace(`/profile/${user?.id}`);
      }
    });
  };

  const onGenderChange = (value: string) => setValue('gender', value);
  const onClothesTypeChange = (value: string) => setValue('clothesType', value);

  watch('gender');
  watch('clothesType');

  return (
    <div className="w-full max-w-2xl px-2 md:px-0">
      <h2 className="text-2xl font-extrabold mb-4">Subir articulo nuevo</h2>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="bg-white border rounded shadow p-4 md:p-8 mb-2 md:mb-4">
          <ImageSection errors={errors} setValue={setValue} />
        </div>

        <div className="bg-white border rounded shadow  p-6 md:p-8 ">
          <TitleSection register={register} errors={errors} />
          <DescriptionSection register={register} errors={errors} />
        </div>

        <div className="bg-white rounded-lg shadow sm:p-6 md:p-8 mt-4">
          <GenderSection
            gender={getValues('gender')}
            onGenderChange={onGenderChange}
          />
          {/* ····························································· */}
          {getValues('gender') && (
            <ClothesTypeSection
              clothesType={getValues('clothesType')}
              onClothesTypeChange={onClothesTypeChange}
            />
          )}
          {/* ····························································· */}
          {getValues('clothesType') && (
            <CategorySection
              gender={getValues('gender')}
              clothesType={getValues('clothesType')}
            />
          )}
          {/* ····························································· */}
          {category && <SubcategorySection />}
        </div>

        {subcategory && (
          <div className="bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mt-4">
            {/* ····························································· */}
            <BrandSection brands={brands} />
            {/* ····························································· */}
            {category && getValues('clothesType') !== 'accesorios' ? (
              <MeasurementSection
                gender={getValues('gender')}
                clothesType={getValues('clothesType')}
              />
            ) : null}
            {/* ····························································· */}
            <ClothesStateSection
              clothingConditionList={clothingConditionList}
            />
            {/* ····························································· */}
            <ColorsSection colors={colors} />
            {/* ····························································· */}
            <PackageDeliverySection data={packageDeliveriesData} />
          </div>
        )}

        {/* ····························································· */}
        {packagesDeliveries.length !== 0 ? <PriceSection /> : null}
        {/* ····························································· */}

        {price !== 0 ? (
          <div className="mt-4">
            <Button label="Publicar" type="submit" />
          </div>
        ) : null}
      </form>
      <CustomModal />
    </div>
  );
};
