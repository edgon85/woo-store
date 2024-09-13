'use client';
import { deletePayoutMethod, updateIsDefault } from '@/actions';
import { PayoutMethod } from '@/interfaces';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

type Props = {
  payoutMethod: PayoutMethod;
};

export const BtnEditPayout = ({ payoutMethod }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (evt: any) => {
      if (isCollapsed && ref.current && !ref.current.contains(evt.target)) {
        setIsCollapsed(false);
      }
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [isCollapsed]);

  const onUpdateIsDefault = async (id: string) => {
    await updateIsDefault(id);
    setIsCollapsed(false);
  };

  const onDeletePayoutMethod = (id: string) => {
    Swal.fire({
      title: '!Eliminar!',
      text: 'Se eliminara esta cuenta de cobros',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, Eliminar!',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,

      preConfirm: async () => {
        const { ok, message } = await deletePayoutMethod(id);

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
          // router.replace('/settings/payments/payout-methods');
        }
      }
    });
  };

  return (
    <div className="relative flex flex-col" ref={ref}>
      <button
        className="border border-cerise-red-500 text-cerise-red-500 px-4 py-2 rounded hover:bg-gradient-to-br hover:from-cerise-red-600 hover:to-cerise-red-700 hover:text-white"
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        Editar
      </button>

      {isCollapsed && (
        <div className="z-10 absolute top-12 right-0 bg-white divide-y divide-gray-100 rounded shadow w-32 md:w-44">
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownDividerButton"
          >
            {!payoutMethod.isDefault && (
              <li onClick={() => onUpdateIsDefault(payoutMethod.id)}>
                <div className="flex gap-2 items-center px-4 py-2 hover:bg-gray-100 cursor-pointer ">
                  <span>Hacer predeterminado</span>
                </div>
              </li>
            )}
            <li onClick={() => onDeletePayoutMethod(payoutMethod.id)}>
              <div className="flex gap-2 items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <span>Eliminar</span>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
