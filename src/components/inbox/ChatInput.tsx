import useWebSocket from '@/hooks/useWebSocket';
import { useInboxStore } from '@/stores';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Props = {
  // currentId: string;
  recipientId: string;
};

type MessageFormInput = {
  messageContent: string;
};

export const ChatInput = ({  recipientId }: Props) => {
  const { pendingMessage, selectedChatId, clearPendingMessage } =
    useInboxStore();
  const { sendMessage, connectionStatus, connect } = useWebSocket();

  const { register, handleSubmit, reset, setValue } =
    useForm<MessageFormInput>();

  // Setear el mensaje pendiente en el input
  useEffect(() => {
    if (pendingMessage) {
      setValue('messageContent', pendingMessage);
      clearPendingMessage();
    }
  }, [pendingMessage, setValue, clearPendingMessage]);

  useEffect(() => {
    if (connectionStatus === 'disconnected') {
      connect();
    }
  }, [connect, connectionStatus]);

  const onSubmit: SubmitHandler<MessageFormInput> = ({ messageContent }) => {
    // console.log(connectionStatus);

    if (messageContent && selectedChatId) {
      const newMessage = {
        content: messageContent,
        // senderId: currentId, // Reemplaza con el ID real del usuario
        recipientId: recipientId,
        timestamp: new Date().toISOString(),
      };
      console.log(newMessage);
      sendMessage(messageContent, recipientId);
      // addMessage(selectedChatId, newMessage);
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
