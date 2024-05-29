import { useInboxStore } from '@/stores';

export const ChatWindow = () => {
  const { selectedChatId, chats } = useInboxStore();
  const chat = chats.find((chat) => chat.id === selectedChatId);

  return (
    <>
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
    </>
  );
};
