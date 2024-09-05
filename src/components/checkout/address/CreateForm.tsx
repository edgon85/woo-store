'use client';

import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, SpinnerIcon } from '@/components/ui';
import Modal from 'react-responsive-modal';
import { useSearchParams } from 'next/navigation';
import { createAddress, getDepartments } from '@/actions';
import { useCheckoutStore } from '@/stores';
import { toast } from 'react-toastify';
import { IDepartment, IMunicipality } from '@/interfaces';

type FormAddress = {
  fullName: string;
  streetAddress: string;
  department: string;
  municipality: string;
  phone: string;
  label: string;
  isPrimary: boolean;
};

type Props = {
  closeModalParent: (value: boolean) => void;
  onAddressCreated: () => void;
};

export const CreateFormAddress = ({
  closeModalParent,
  onAddressCreated,
}: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [municipalities, setMunicipalities] = useState<IMunicipality[]>([]);

  const setShippingAddress = useCheckoutStore(
    (state) => state.setShippingAddress
  );

  const searchParams = useSearchParams();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormAddress>();

  const selectedDepartment = watch('department');

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      const department = departments.find((d) => d.slug === selectedDepartment);

      if (department) {
        setMunicipalities(department.municipalities!);
        setValue('municipality', '');
      }
    }
  }, [selectedDepartment, departments, setValue]);

  const onHandleSubmit = async (formData: FormAddress) => {
    setShowLoading(true);

    const newAddress = {
      department: formData.department,
      fullName: formData.fullName.trim(),
      label: formData.label.trim(),
      municipality: formData.municipality,
      phone: formData.phone.trim(),
      streetAddress: formData.streetAddress.trim(),
    };
    const { ok, data, message } = await createAddress(newAddress);

    if (!ok) {
      toast.error(message);
      setShowLoading(false);
      return;
    } else {
      onAddressCreated();
      setShippingAddress(data);
      setShowLoading(false);
      closeModal();
      closeModalParent(false);
    }
  };

  const closeModal = () => {
    reset();
    setModalOpen(false);
  };

  const fetchDepartments = async () => {
    const { data } = await getDepartments();

    setDepartments(data);
  };

  return (
    <>
      <button
        className="rounded border border-cerise-red-500 text-cerise-red-500 hover:bg-cerise-red-600 hover:text-white text-xs p-2"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Agregar
      </button>
      <Modal onClose={closeModal} open={isModalOpen} center>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <div className="w-96 p-4 flex flex-col gap-2">
            <label htmlFor="department">Departamento</label>
            <Controller
              name="department"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <select
                    className="flex-1 w-full p-2 border rounded-md"
                    {...field}
                  >
                    <option value="">Seleccione un departamento</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.slug}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                  {error && <span>{error.message}</span>}
                </div>
              )}
            />

            <label htmlFor="municipality">Municipio</label>
            <Controller
              name="municipality"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <select
                    className="flex-1 w-full p-2 border rounded-md"
                    {...field}
                    disabled={!selectedDepartment}
                  >
                    <option value="">Seleccione un municipio</option>
                    {municipalities.map((municipality) => (
                      <option key={municipality.id} value={municipality.slug}>
                        {municipality.name}
                      </option>
                    ))}
                  </select>
                  {error && <span>{error.message}</span>}
                </div>
              )}
            />

            <label htmlFor="address">Dirección</label>
            <input
              id="address"
              type="text"
              className=" flex-1 w-full p-2 border rounded-md resize-none"
              placeholder="Ej: 11 calle 1-29 zona 3"
              {...register('streetAddress', {
                required: 'Este campo es requerido',
              })}
            />
            {errors.streetAddress && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.streetAddress.message}
              </p>
            )}

            <label htmlFor="fullName">Nombre y Apellido</label>
            <input
              id="fullName"
              type="text"
              className=" flex-1 w-full p-2 border rounded-md resize-none"
              placeholder="Nombre y Apellido"
              {...register('fullName', {
                required: 'Este campo es requerido ',
              })}
            />
            {errors.fullName && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.fullName.message}
              </p>
            )}

            <label htmlFor="phone">Teléfono</label>
            <input
              id="phone"
              type="tel"
              className=" flex-1 w-full p-2 border rounded-md resize-none"
              placeholder="numero de teléfono"
              {...register('phone', {
                required: 'Este campo res requerido',
                pattern: {
                  value: /^\d{8}$/,
                  message: 'Debe contener exactamente 8 dígitos.',
                },
              })}
            />
            {errors.phone && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.phone.message}
              </p>
            )}

            <label htmlFor="reference">Referencia</label>
            <input
              id="reference"
              type="text"
              className=" flex-1 w-full p-2 border rounded-md resize-none mb-4"
              placeholder="ej: casa amarilla frente al parque infantil"
              {...register('label')}
            />
            {errors.label && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.label.message}
              </p>
            )}

            {showLoading ? (
              <>
                <div className="flex justify-center items-center">
                  <SpinnerIcon className="w-6 h-6 animate-spin" />
                </div>
              </>
            ) : (
              <Button label="Guardar" type="submit" />
            )}
          </div>
        </form>
      </Modal>
    </>
  );
};
