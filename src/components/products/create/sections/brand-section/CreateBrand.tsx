import { createBrand } from '@/actions';
import { IBrand } from '@/interfaces';
import { useAuthStore, useModalStore } from '@/stores';
import { BsPlusCircle } from 'react-icons/bs';
import Swal from 'sweetalert2';

type Props = {
  name: string;
  setBrand: (brand: IBrand) => void;
  setSearchQuery: (value: string) => void;
};

export const CreateBrand = ({ name, setBrand, setSearchQuery }: Props) => {
  const closeModal = useModalStore((state) => state.closeModal);
  const { user } = useAuthStore((state) => state);

  const handleOnclick = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      html: `Deseas crear la marca <b>${name}</b>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, crear',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const { message, data, ok } = await createBrand(name);
        if (!ok) {
          Swal.showValidationMessage(`error: ${message}`);
          return;
        }

        return data;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        setBrand(result.value);
        setSearchQuery('');
        closeModal();
        Swal.fire({
          title: `${result.value.title} creado`,
        });
      }
    });
  };

  return (
    <div className="flex items-center justify-between w-full mt-4">
      <div>
        <h4 className="text-lg text-gray-500 font-semibold">
          Marca no encontrada
        </h4>
        <p className="text-sm">
          Crear nueva marca <span className="text-primary">{name}</span>
        </p>
      </div>
      <span onClick={handleOnclick} className=" text-primary cursor-pointer">
        <BsPlusCircle size={24} />
      </span>
    </div>
  );
};
