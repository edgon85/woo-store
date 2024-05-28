import useWebSocket from '@/hooks/useWebSocket';
import { useInboxStore } from '@/stores';
import { useState } from 'react';

type Props = {
  currentId: string;
  recipientId: string;
  username: string;
};

export const ChatWindow = ({ currentId, recipientId, username }: Props) => {
  const { selectedChatId, chats, addMessage } = useInboxStore();
  const chat = chats.find((chat) => chat.id === selectedChatId);
  const [messageContent, setMessageContent] = useState('');
  const { sendMessage } = useWebSocket('http://localhost:5000'); // Reemplaza 'user-id' con el ID real del usuario

  const handleSendMessage = () => {
    if (messageContent && chat) {
      const message = {
        // id: 'uuidv4()',
        content: messageContent,
        senderId: currentId, // Reemplaza con el ID real del usuario
        recipientId: chat.participants.find((id) => id !== recipientId) || '', // Reemplaza con el ID real del destinatario
        timestamp: new Date().toISOString(),
      };
      sendMessage(messageContent, 'user-id', 'recipient-id');
      addMessage(chat.id, message);
      setMessageContent('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-200 p-4 text-xl font-semibold">
        {chat?.fullName}
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat?.messages.map((msg) => (
          <div
            key={msg.id}
            className={`${
              msg.senderId === 'user-id'
                ? 'self-end bg-blue-500'
                : 'self-start bg-gray-300'
            } p-2 rounded-lg max-w-xs text-white`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-100 flex">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-lg"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Escribe un mensaje"
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={handleSendMessage}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};
