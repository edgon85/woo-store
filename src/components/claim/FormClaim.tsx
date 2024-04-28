import { createNewClaim } from '@/actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

type FormData = {
  info: string;
};

type Props = {
  orderId: string;
};

export const FormClaim = ({ orderId }: Props) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onHandleClick = ({ info }: FormData) => {
    Swal.fire({
      title: 'Ticket de reclamo',
      // text: 'Se a generado un ticket de reclamo, servicio al cliente se comunicara con ud.',
      text: 'Se va a generar un ticket de reclamo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí!',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,

      preConfirm: async () => {
        const { ok, message } = await createNewClaim(
          info,
          searchParams.get('reason') || '',
          orderId
        );

        if (!ok) {
          Swal.showValidationMessage(`error: ${message}`);
          return;
        }

        return 'todo ok';
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (result.value === 'todo ok') {
          replace('/settings/transactions/purchases');
        }
      }
    });
  };

  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit(onHandleClick)}
      noValidate
    >
      <label htmlFor="" className="mt-4">
        Describe cual es el problema
      </label>
      <textarea
        className="outline-none p-2"
        placeholder="Describe la inconformidad"
        {...register('info', {
          required: 'Este campo es valido',
        })}
      ></textarea>

      <div className="mt-4">
        <button className="bg-cerise-red-600 text-white rounded px-4 py-2">
          Enviar
        </button>
      </div>
    </form>
  );
};
