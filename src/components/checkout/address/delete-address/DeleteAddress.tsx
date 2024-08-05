import { deleteAddress } from '@/actions';
import { useCheckoutStore } from '@/stores';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

type Props = {
  addressId: string;
  onAddressDeleted: (addressId: string) => void;
};

export const DeleteAddress = ({ addressId, onAddressDeleted }: Props) => {
  const address = useCheckoutStore((state) => state.address);

  const onDeleteAddress = () => {
    // Comprobar si la dirección actual es la que se intenta eliminar
    if (address && address.id === addressId) {
      Swal.fire({
        title: 'No se puede eliminar',
        text: 'Esta dirección está seleccionada actualmente. Por favor, seleccione o agregue otra dirección antes de eliminar esta.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Entendido',
      });
      return;
    }

    Swal.fire({
      title: 'Eliminar?',
      text: '¿Desea eliminar esta dirección?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, Eliminar!',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const data = await deleteAddress(addressId);
          if (!data.ok) {
            throw new Error(data.message);
          }
          return data;
        } catch (error: any) {
          Swal.showValidationMessage(`Error: ${error.message}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value?.ok) {
          toast.success(result.value.message);
          onAddressDeleted(addressId);
        } else {
          toast.error(result.value?.message || 'Error desconocido');
        }
      }
    });
  };

  return (
    <button
      onClick={onDeleteAddress}
      className="rounded border border-cerise-red-500 text-cerise-red-500 hover:bg-cerise-red-600 hover:text-white text-xs p-2"
    >
      <MdOutlineDeleteForever />
    </button>
  );
};
