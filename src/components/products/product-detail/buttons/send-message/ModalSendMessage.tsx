import { useContext } from 'react';
import { Divider } from '@tremor/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Modal from 'react-responsive-modal';

import { ChatContext } from '@/context';
import { createNewMessageForChat, getInboxChats } from '@/actions';

type FormInputData = {
  message: string;
};

type Props = {
  recipientId: string;
  recipientUsername: string;
  productId: string;
  title: string;
  open: boolean;
  orderId: string | null;
  setOpen: (value: boolean) => void;
};
export const ModalSendMessage = ({
  open,
  setOpen,
  recipientId,
  productId,
  title,
  recipientUsername,
}: Props) => {
  const router = useRouter();
  const { dispatch } = useContext(ChatContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputData>();

  const onSubmit = async (data: FormInputData) => {
    const { ok: okNewMessage } = await createNewMessageForChat(
      data.message.trim(),
      recipientId,
      productId
    );

    if (okNewMessage) {
      const { ok, data: usuarios } = await getInboxChats();

      if (ok) {
        dispatch({
          type: '[Chat] - cargar-usuarios',
          payload: usuarios,
        });

        reset();
        setOpen(false);

        const params = new URLSearchParams('');
        params.set('u', recipientId);
        params.set('n', recipientUsername);

        const url = params.toString();
        router.push(`/inbox?${url}`);
        // router.push('/inbox');
      } else {
        console.log('Error al cargar los mensajes');
      }
    } else {
      console.log('Error al enviar el mensaje');
    }
  };

  const onCloseModal = () => {
    reset();
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={onCloseModal} center>
      <section className="md:w-96">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-center text-lg font-semibold">Enviar mensaje</h2>
          <p>
            Hola! Si tienes cualquier duda acerca de mi artículo{' '}
            <span className="font-bold">{title}</span> puedes escribirme aquí
          </p>
          <Divider />
          <div className="mb-4">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
              placeholder="Escribe un mensaje..."
              {...register('message', {
                required: 'Este campo es requerido',
              })}
            />
            {errors.message && (
              <span className="text-sm text-red-800">
                {errors.message.message}
              </span>
            )}
          </div>
          <div className="pt-2">
            <button
              type="submit"
              className="w-full ml-2 px-4 py-2 bg-cerise-red-600 hover:bg-cerise-red-500 text-white rounded-lg"
            >
              Enviar
            </button>
          </div>
        </form>
      </section>
    </Modal>
  );
};
