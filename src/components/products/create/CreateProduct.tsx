'use client';

import { useAuth } from '@/hooks';
import { IProduct } from '@/interfaces';

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
} from './sections';
import { IPackageDelivery } from '@/lib';

export type FormInputs = {
  title: string;
  description: string;
  gender: string;
};

type Props = {
  packageDeliveriesData: IPackageDelivery[];
};

export const CreateProduct = ({ packageDeliveriesData }: Props) => {
  const { user } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
    },
  });

  const gender = useCreateProductStore((state) => state.gender);
  const clothesType = useCreateProductStore((state) => state.clothesType);
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

  const onHandleSubmit: SubmitHandler<FieldValues> = (data) => {
    const newProduct: IProduct = {
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
      packageDelivery: [],
    };

    onCreateNewProduct(newProduct, user!.token);
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

  return (
    <div className="w-full max-w-2xl px-2 md:px-0">
      <h2 className="text-2xl font-extrabold mb-4">Subir articulo nuevo</h2>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="bg-white border rounded shadow  p-6 md:p-8 ">
          <TitleSection register={register} errors={errors} />
          <DescriptionSection register={register} errors={errors} />
        </div>

        <div className="bg-white rounded-lg shadow sm:p-6 md:p-8 mt-4">
          <GenderSection />
          {/* ····························································· */}
          {gender && <ClothesTypeSection />}
          {/* ····························································· */}
          {clothesType && <CategorySection />}
          {/* ····························································· */}
          {category && <SubcategorySection />}
        </div>

        {subcategory && (
          <div className="bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mt-4">
            {/* ····························································· */}
            <BrandSection />
            {/* ····························································· */}
            {category && clothesType !== 'accesorios' ? (
              <MeasurementSection />
            ) : null}
            {/* ····························································· */}
            <ClothesStateSection />
            {/* ····························································· */}
            <ColorsSection />
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
