import { MdOutlineDeleteForever } from 'react-icons/md';
import Swal from 'sweetalert2';

type Props = {
  addressId: string;
};

export const DeleteAddress = ({ addressId }: Props) => {
  const onDeleteAddress = () => {
    console.log(addressId);
    Swal.fire({
      title: 'Desea eliminar esta dirección',
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
