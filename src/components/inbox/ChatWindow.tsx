import useWebSocket from '@/hooks/useWebSocket';
import { useInboxStore } from '@/stores';
import { useEffect } from 'react';
export const ChatWindow = () => {

  const { connect, connectionStatus } = useWebSocket();

  const { selectedChatId, chats } = useInboxStore();
  const chat = chats.find((chat) => chat.id === selectedChatId);

  useEffect(() => {
    if (connectionStatus === 'disconnected') {
      connect();
    }
  }, [connect, connectionStatus]);

  return (
    <>
      <p>{connectionStatus}</p>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat ? (
          chat.messages.map((msg) => (
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
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Selecciona un chat para comenzar
          </div>
        )}
      </div>
    </>
  );
};
