'use client'
import { useInboxStore } from '@/stores';
import { UserListItem } from './UserListItem';

export const ChatList = () => {
  const { chats, selectChat, selectedChatId } = useInboxStore();
  return (
    <>
      <div className="border-b-2 py-4 px-2">
        <h3>Mensajes</h3>
      </div>

      {/* {chats.map((chat) => (
        <div
          key={chat.id}
          className={`chat-item ${
            chat.id === selectedChatId ? 'selected' : ''
          }`}
          onClick={() => selectChat(chat.id)}
        >
          <div className="chat-name">{chat.fullName}</div>
          <div className="last-message">{chat.lastMessage}</div>
        </div>
      ))} */}
      {chats.map((chat) => {
        return <UserListItem key={chat.id} chat={chat} />;
      })}
    </>
  );
};

/* 
<UserListItem
        profilePicture="https://source.unsplash.com/_7LbC5J-jw4/600x600"
        username="Luis1994"
      />
 <UserListItem
        profilePicture="https://source.unsplash.com/otT2199XwI8/600x600"
        username="Everest Trip 2021"
      />
      <UserListItem
        profilePicture="https://source.unsplash.com/L2cxSuKWbpo/600x600"
        username="MERN Stack"
      />
      <UserListItem
        profilePicture="https://source.unsplash.com/vpOeXr5wmR4/600x600"
        username="Javascript Indonesia"
      />
*/
