import useWebSocket from '@/hooks/useWebSocket';
import { useInboxStore } from '@/stores';
import { useEffect } from 'react';

export const ChatWindow = () => {
  /* 
    const { selectedChatId } = useInboxStore();
  const { messages } = useWebSocket('http://localhost:5000');
  const chatMessages = messages.filter((msg) => msg.recipientId === selectedChatId || msg.senderId === selectedChatId);

  */
  const { selectedChatId } = useInboxStore();
  const { connectionStatus, messages, connect} = useWebSocket();
  const chatMessages = messages.filter(
    (msg) =>
      msg.recipientId === selectedChatId || msg.senderId === selectedChatId
  );
  useEffect(() => {
    if (connectionStatus === 'disconnected') {
      connect();
    }

  }, [connect, connectionStatus]);
  console.log(connectionStatus);
  console.log(messages);
  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((msg) => (
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
    </>
  );
};
