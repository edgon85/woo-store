'use client';
import { useInboxStore } from '@/stores';
import { UserListItem } from './UserListItem';

export const ChatList = () => {
  const { chats } = useInboxStore();

  if (!chats || chats.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No tienes mensajes
      </div>
    );
  }

  return (
    <>
      <div className="border-b-2 py-4 px-2">
        <h3>Mensajes</h3>
      </div>

      {chats && chats.length > 0 ? (
        chats.map((chat) => <UserListItem key={chat.id} chat={chat} />)
      ) : (
        <div className="py-4 px-2 text-gray-500">No tienes mensajes</div>
      )}
    </>
  );
};
