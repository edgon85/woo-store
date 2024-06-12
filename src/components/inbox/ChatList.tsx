'use client';

import { UserListItem } from './UserListItem';
import { IChat } from '@/interfaces';
import { useContext } from 'react';
import { ChatContext } from '@/context';

export const ChatList = () => {
  // const { chats } = useInboxStore();

  const { chatState } = useContext(ChatContext);




  if (!chatState.users || chatState.users.length === 0) {
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

      {chatState.users && chatState.users.length > 0 ? (
        chatState.users.map((chat: IChat) => (
          // <UserListItem key={chat.id} user={chat} />
        ))
      ) : (
        <div className="py-4 px-2 text-gray-500">No tienes mensajes</div>
      )}
    </>
  );
};
