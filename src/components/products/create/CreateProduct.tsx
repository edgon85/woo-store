'use client';
import { useRouter } from 'next/navigation';

import { useProductForm, useUnsavedChangesWarning } from '@/hooks';
import Swal from 'sweetalert2';

import { IBrand, IClothesState, IColor, IDepartment } from '@/interfaces';

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
  ImageSection,
  WeightSection,
  DepartmentSection,
  MunicipalitySection,
} from './sections';

type Props = {
  brands: IBrand[];
  clothingConditionList: IClothesState[];
  colors: IColor[];
  departments: IDepartment[];
};

export const CreateProduct = ({
  brands,
  clothingConditionList,
  colors,
  departments,
}: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    getValues,
    watch,
    onSubmit,
    resetStore,
    category,
    subcategory,
    department,
    municipality,
  } = useProductForm(
    'create',
    undefined,
    async (newProduct, formImagesData) => {
      if (!formImagesData) {
        console.error('No image data provided');
        return;
      }

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
            newProduct,
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
            html: `<p>${result.value?.message}</p>`,
            icon: 'success',
          });
          resetStore();
          router.replace(`/member/${result.value?.user}`);
        }
      });
    }
  );

  useUnsavedChangesWarning(isDirty);

  watch('gender');
  watch('clothesType');
  watch('weight');
  watch('price');

  return (
    <div className="w-full max-w-2xl px-2 md:px-0">
      <h2 className="text-2xl font-extrabold mb-4">Subir articulo nuevo</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white border rounded shadow p-4 md:p-8 mb-2 md:mb-4">
          <DepartmentSection departments={departments} />
          {department && <MunicipalitySection />}
        </div>

        {municipality && (
          <>
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
                onGenderChange={(value) => setValue('gender', value)}
              />

              {/* ····························································· */}
              {getValues('gender') && (
                <ClothesTypeSection
                  clothesType={getValues('clothesType')}
                  onClothesTypeChange={(value) =>
                    setValue('clothesType', value)
                  }
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
          </>
        )}
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
            {<WeightSection register={register} errors={errors} />}
          </div>
        )}

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
            <Button label="Publicar" type="submit" />
          </div>
        ) : null}
      </form>
      <CustomModal />
    </div>
  );
};
