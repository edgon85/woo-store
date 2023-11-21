'use client';

import { revalidateData, updateAddress } from '@/actions/actions';
import { Button, EditIcon, SpinnerIcon } from '@/components/ui';
import { IAddress } from '@/interfaces';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-responsive-modal';

export const departamentosGuatemala: string[] = [
  'Alta Verapaz',
  'Baja Verapaz',
  'Chimaltenango',
  'Chiquimula',
  'Petén',
  'El Progreso',
  'Quiché',
  'Escuintla',
  'Guatemala',
  'Huehuetenango',
  'Izabal',
  'Jalapa',
  'Jutiapa',
  'Quetzaltenango',
  'Retalhuleu',
  'Sacatepéquez',
  'San Marcos',
  'Santa Rosa',
  'Sololá',
  'Suchitepéquez',
  'Totonicapán',
  'Zacapa',
];

type FormAddress = {
  id: string;
  fullName: string;
  fullAddress: string;
  city: string;
  country: string;
  phone: string;
  label: string;
  isPrimary: boolean;
};

type Props = {
  address: IAddress;
};

export const UpdateFormAddress = ({ address }: Props) => {
  const [isModalOpen, setOpenEditModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const params = searchParams.get('transaction');

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
    reset,
  } = useForm<FormAddress>({
    defaultValues: {
      fullName: address?.fullName,
      fullAddress: address?.fullAddress,
      city: address?.city,
      country: address?.country,
      phone: address?.phone,
      label: address?.label,
    },
  });

  const onHandleSubmit = async (formData: FormAddress) => {
    setShowLoading(true);

    const data = await updateAddress(`${address?.id}`, { ...formData });

    if (data.message !== 'ok') {
      setError(data.message);
      setShowLoading(false);
      return;
    } else {
      await revalidateData(
        `/checkout?transaction=${params}`,
        `/checkout?transaction=${params}`
      );
      setShowLoading(false);
      closeModal();
    }
  };

  const closeModal = () => {
    reset();
    setOpenEditModal(false);
  };
  return (
    <div>
      <button onClick={() => setOpenEditModal(true)}>
        <EditIcon />
      </button>
      <Modal onClose={closeModal} open={isModalOpen} center>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <div className="w-96 p-4 flex flex-col gap-2">
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

            <label htmlFor="address">Dirección</label>
            <input
              id="address"
              type="text"
              className=" flex-1 w-full p-2 border rounded-md resize-none"
              placeholder="Dirección completa"
              {...register('fullAddress', {
                required: 'Este campo es requerido',
              })}
            />
            {errors.fullAddress && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.fullAddress.message}
              </p>
            )}

            <label className="flex-1 block text-base font-medium text-gray-700">
              Ciudad
            </label>
            <select
              className="flex-1 w-full p-2 border rounded-md"
              {...register('city')}
              onChange={({ target }) => setValue('city', target.value)}
            >
              {/* <option value="">Elegir ciudad</option> */}
              {departamentosGuatemala.map((departamento) => (
                <option key={departamento} value={departamento}>
                  {departamento}
                </option>
              ))}
            </select>

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
              placeholder="numero de teléfono"
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
                  <SpinnerIcon className="animate-spin" />
                </div>
              </>
            ) : (
              <Button label="Guardar" type="submit" />
            )}

            {error && (
              <>
                <span className="text-sm text-red-700">
                  Error al editar la dirección intente mas tarde
                </span>
              </>
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
};