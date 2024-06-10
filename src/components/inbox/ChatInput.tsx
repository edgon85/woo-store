import { ChatContext, SocketContext } from '@/context';

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
  // const [message, setMessage] = useState('');
  const { chatState } = useContext(ChatContext);
  const { socket } = useContext(SocketContext);

  const { register, handleSubmit, reset, setValue } =
    useForm<MessageFormInput>();

  const onSubmit = ({ messageContent }: MessageFormInput) => {
    if (messageContent.trim() === '') return;
    /*
    const newMessage = {
      content: message,
      senderId: chatState.user.id,
      recipientId: recipientId,
      timestamp: new Date().toISOString(),
    }; */

    // sendMessage(newMessage);
    socket?.emit('message-from-client', {
      message: messageContent,
      from: chatState.activeChat?.senderId,
      to: chatState.activeChat?.recipientId,
    });

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-gray-100 flex">
      <input
        type="text"
        className="w-full bg-gray-300 py-5 px-3 rounded-xl"
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
