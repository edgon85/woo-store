import { updateProduct } from '@/actions';
import { useCreateProductStore } from '@/stores';
import React, { ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

type Props = {
  productId: string;
};

export const IsShippingIncluded = ({ productId }: Props) => {
  const setIsShippingIncluded = useCreateProductStore(
    (state) => state.setIsShippingIncluded
  );
  const isShippingIncluded = useCreateProductStore(
    (state) => state.isShippingIncluded
  );

  const handleCheckboxChange = (evt: ChangeEvent<HTMLInputElement>) => {
    // setIsShippingIncluded(evt.target.checked);

    Swal.fire({
      title: '!Esta seguro!',
      text: !isShippingIncluded
        ? 'Esto indica que el precio del envío se incluye'
        : 'Esto indica que el precio del envío no se incluye',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, actualizar!',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,

      preConfirm: async () => {
        const data = { isShippingIncluded: !isShippingIncluded };
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
        setIsShippingIncluded(isShippingIncluded);
      }
    });
  };

  return (
    <div className=" flex flex-col md:flex-row gap-2 justify-between items-center mb-2">
      <div className="flex-1">
        <p className="block">¿El envío esta incluido en el precio de venta?</p>
      </div>
      <div className="flex-1">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isShippingIncluded}
            onChange={handleCheckboxChange}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lightPrimary rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-primary"></div>
          <span className="ml-3 text-sm font-medium">
            {isShippingIncluded
              ? 'Envío incluido'
              : 'NO, el comprador paga el envío'}
          </span>
        </label>
      </div>
    </div>
  );
};
