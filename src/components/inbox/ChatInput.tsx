import { ChatContext, SocketContext } from '@/context';
import Cookies from 'js-cookie';

import { useContext } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  // currentId: string;
  recipientId: string;
};

type MessageFormInput = {
  messageContent: string;
};

export const ChatInput = ({ recipientId }: Props) => {
  const currentId = Cookies.get('userId');
  const { socket } = useContext(SocketContext);

  const { register, handleSubmit, reset, setValue } =
    useForm<MessageFormInput>();

  const onSubmit = ({ messageContent }: MessageFormInput) => {
    if (messageContent.trim() === '') return;

    // console.log({currentId, recipientId});
    socket?.emit('message-from-client', {
      message: messageContent,
       from: currentId,
      to: recipientId,
    });

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-gray-100 flex h-24">
      <input
        type="text"
        className="w-full bg-gray-300 py-5 px-3 rounded-xl h-full"
        placeholder="Escribe un mensaje"
        {...register('messageContent', { required: true })}
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-cerise-red-600 text-white rounded-lg"
      >
        Enviar
      </button>
    </form>
  );
};
