import useWebSocket from '@/hooks/useWebSocket';
import { useInboxStore } from '@/stores';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Props = {
  currentId: string;
  recipientId: string;
};

type MessageFormInput = {
  messageContent: string;
};

export const ChatInput = ({ currentId, recipientId }: Props) => {
  const { selectedChatId, chats, addMessage } = useInboxStore();
  const chat = chats.find((chat) => chat.id === selectedChatId);
  const { connect, sendMessage, connectionStatus } = useWebSocket(); // Reemplaza 'user-id' con el ID real del usuario

  const { register, handleSubmit, reset } = useForm<MessageFormInput>({
    defaultValues: { messageContent: '' },
  });

  useEffect(() => {
    if (connectionStatus === 'disconnected') {
      connect();
    }

  }, [connect, connectionStatus]);

  const onSubmit: SubmitHandler<MessageFormInput> = ({ messageContent }) => {
    console.log(connectionStatus);

    if (messageContent && chat) {
      const newMessage = {
        // id: 'uuidv4()',
        content: messageContent,
        senderId: currentId, // Reemplaza con el ID real del usuario
        recipientId: chat.participants.find((id) => id !== recipientId) || '', // Reemplaza con el ID real del destinatario
        timestamp: new Date().toISOString(),
      };
      sendMessage(messageContent, recipientId);
      addMessage(chat.id, newMessage);
      reset();
    }
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
