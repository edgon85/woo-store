import { updateProduct } from '@/actions';
import { useEffect, useState } from 'react';
import { ProductStatus } from '@/enums';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

type Props = {
  productId: string;
  productStatus: string;
};

export const StatusSection = ({ productStatus, productId }: Props) => {
  const [isAvailable, setIsAvailable] = useState(
    productStatus === ProductStatus.Available
  );

  useEffect(() => {
    setIsAvailable(productStatus === ProductStatus.Available);
  }, [productStatus]);

  const handleCheckboxChange = async () => await onUpdateData();

  const onUpdateData = async () => {
    setIsAvailable(!isAvailable);

    Swal.fire({
      title: '!Esta seguro!',
      text: isAvailable
        ? 'Esto ocultara el producto para todos excepto el dueño'
        : 'Esto pondrá el producto visible para todos',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, actualizar!',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,

      preConfirm: async () => {
        const status = !isAvailable
          ? ProductStatus.Available
          : ProductStatus.Hidden;

        const data = { status };
        const { ok, message } = await updateProduct(productId, data);

        if (!ok) {
          Swal.showValidationMessage(`error: ${message}`);
          return;
        }

        return 'todo ok';
      },
      allowOutsideClick: () => {
        const popup = Swal.getPopup() as HTMLElement;
        popup.classList.remove('swal2-show');
        return !Swal.isLoading();
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (result.value === 'todo ok') {
          toast.success('¡Producto actualizado!');
          console.log('todo ok');
        }
      } else if (result.dismiss) {
        setIsAvailable(productStatus === ProductStatus.Available);
      }
    });
  };

  return (
    <>
      <div className=" flex justify-between items-center">
        <p className="block text-sm font-medium text-gray-900">Disponible:</p>

        <label className="relative inline-flex items-center cursor-pointer ">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={isAvailable}
            onChange={handleCheckboxChange}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lightPrimary rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-primary"></div>
        </label>
      </div>
    </>
  );
};
