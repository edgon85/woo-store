import { updateProfile } from '@/actions';
import { SpinnerIcon } from '@/components/ui';
import { IProfile } from '@/interfaces';
import { useCreateProductStore, useModalStore } from '@/stores';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type Props = {
  profile: IProfile;
  setCurrentAddress: Dispatch<SetStateAction<string | null>>;
};

type FormProfileData = {
  phone: string;
  address: string;
};

export const AddressForm = ({ profile, setCurrentAddress }: Props) => {
  const department = useCreateProductStore((state) => state.department);
  const closeModal = useModalStore((state) => state.closeModal);
  const [isLoading, setIsLoading] = useState(false);

  const { address } = profile;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormProfileData>({
    defaultValues: {
      phone: profile.phone,
      address: profile.address,
    },
  });

  const onHandleSubmit = async (FormProfileData: FormProfileData) => {
    setIsLoading(true);
    const dataToUpdate = {
      ...profile,
      address: FormProfileData.address.trim(),
      phone: FormProfileData.phone.trim(),
      location: department?.name.trim(),
    };

    const { message, ok } = await updateProfile({
      ...dataToUpdate,
    });

    if (!ok) {
      toast.error(message || 'Ocurrió un error al actualizar.');
      setIsLoading(false);
      return;
    }
    toast.success('¡Tu dirección ha sido actualizada!');
    setCurrentAddress(FormProfileData.address.trim());
    setIsLoading(false);
    reset();
    closeModal();
  };
  return (
    <div>
      <h2 className="mb-4">
        {address ? 'Actualizar dirección' : 'Agregar dirección'}
      </h2>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="flex flex-col justify-between gap-2 w-full">
          <div>
            <label htmlFor="address">Dirección</label>

            <textarea
              id="address"
              rows={3}
              className=" flex-1 w-full p-2 border rounded-md resize-none"
              placeholder="agrega tu dirección exacta"
              {...register('address', {
                required: 'Este campo es requerido',
              })}
            ></textarea>
            {errors.address && (
              <p className="text-red-600 text-xs mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="phone">Teléfono</label>
            <input
              type="tel"
              className="w-full p-2 border rounded-md"
              placeholder="Ingrese 8 dígitos"
              {...register('phone', {
                required: 'Este campo es requerido',
                pattern: {
                  value: /^\d{8}$/,
                  message: 'Debe contener exactamente 8 dígitos.',
                },
              })}
            />
            {errors.phone && (
              <p className="text-red-600 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            //   onClick={handleSubmit(onHandleSubmit)}
            type="submit"
            className="bg-cerise-red-600 hover:bg-cerise-red-500 text-white py-2 p-4 rounded mt-4 "
          >
            {isLoading ? (
              <SpinnerIcon className="w-5 h-5 animate-spin" />
            ) : (
              <>{address ? 'Actualizar' : 'Agregar'}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
