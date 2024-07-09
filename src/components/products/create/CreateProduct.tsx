'use client';

import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { Control, SubmitHandler, useForm, useWatch } from 'react-hook-form';

import {
  IBrand,
  IClothesState,
  IColor,
  IProduct,
  IPackageDelivery,
} from '@/interfaces';
import { useCreateProductStore } from '@/stores';
import { createProduct } from '@/actions';

import { Button } from '../../ui';
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
import { useEffect } from 'react';
import { ProductStatus } from '@/enums';

export type FormInputs = {
  title: string;
  description: string;
  gender: string;
  clothesType: string;

  images: File[];
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
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    setError,
    getValues,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      title: '',
      description: '',
      gender: '',
      clothesType: '',

      images: [],
    },
  });

  function FirstNameWatched({ control }: { control: Control<FormInputs> }) {
    const firstName = useWatch({
      control,
      name: 'title', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
      defaultValue: 'default', // default value before the render
    });
  }

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    if (isDirty || Object.values(FirstNameWatched).some(Boolean)) {
      const message =
        '¿Estás seguro de que quieres abandonar la página? Tu información no guardada se perderá.';
      event.returnValue = message;
      return message;
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty, FirstNameWatched]);

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
  const resetStore = useCreateProductStore((state) => state.resetStore);

  const onHandleSubmit: SubmitHandler<FormInputs> = async (
    data: FormInputs
  ) => {
    const formData = new FormData();

    if (data.images.length < 2) {
      setError('images', { message: 'seleccione mínimo 2 imágenes' });
      return;
    }

    data.images.forEach((image) => {
      formData.append('images', image);
    });

    const newProduct: IProduct = {
      images: [],
      title: data.title,
      description: data.description,
      subcategory: subcategory!,
      brand: brand!,
      price: price,
      slug: '',
      colors: [...color.map((col) => col)],
      measurement: measurement!,
      clothesState: clothesState!,
      status: ProductStatus.Available,
      packageDelivery: [...packagesDeliveries.map((resp) => resp)],
    };

    // console.log(data.images);
    await onCreateNewProduct(newProduct, formData);
  };

  const onCreateNewProduct = async (
    product: IProduct,
    formImagesData: FormData
  ) => {
    Swal.fire({
      title: '¿Estás seguro?',
      html: `Se va a crear un nuevo producto`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, crear',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,

      preConfirm: async () => {
        const { ok, message, data } = await createProduct(
          product,
          formImagesData
        );
        if (!ok) {
          Swal.showValidationMessage(`error: ${message}`);
          return;
        }

        return data;
      },
      allowOutsideClick: () => {
        const popup = Swal.getPopup() as HTMLElement;
        popup.classList.remove('swal2-show');
        return !Swal.isLoading();
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.title} creado`,
          icon: 'success',
        });
        resetStore();
        router.replace(`/member/${result.value.user.username}`);
      }
    });
  };

  const onGenderChange = (value: string) => setValue('gender', value);
  const onClothesTypeChange = (value: string) => setValue('clothesType', value);

  useEffect(() => {
    resetStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  watch('gender');
  watch('clothesType');

  return (
    <div className="w-full max-w-2xl px-2 md:px-0">
      <h2 className="text-2xl font-extrabold mb-4">Subir articulo nuevo</h2>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="bg-white border rounded shadow p-4 md:p-8 mb-2 md:mb-4">
          <ImageSection
            register={register}
            errors={errors}
            setValue={setValue}
          />
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
