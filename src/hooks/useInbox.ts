import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { Socket } from 'socket.io-client';
import { useInboxStore } from '@/stores';
import { getInboxChats } from '@/actions';

const useNotifications = (socket: Socket | null) => {
  const { user, isLoggedIn } = useAuth();
  const { setChats, addUnreadChatId, unreadChatIds } = useInboxStore();

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchNotifications = async () => {
      try {
        const { data } = await getInboxChats();

        setChats(data);
        data.forEach((chat: any) => {
          const isUnread =
            chat.senderId === user?.id ? !chat.senderRead : !chat.recipientRead;
          if (isUnread) {
            addUnreadChatId(chat.id);
          }
        });
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
    fetchNotifications();
  }, [isLoggedIn, user?.id, addUnreadChatId, setChats]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage: any) => {
      setChats((prevChats: any) => {
        const updatedChats = prevChats.map((chat: any) =>
          chat.id === newMessage.chatId
            ? {
                ...chat,
                lastMessage: newMessage.message,
                chatInboxDate: newMessage.chatInboxDate,
                senderRead: chat.user.id === user?.id ? true : false,
                recipientRead: chat.recipient.id === user?.id ? true : false,
              }
            : chat
        );

        const chatAlreadyUnread = unreadChatIds.has(newMessage.chatId);

        if (!chatAlreadyUnread) {
          addUnreadChatId(newMessage.chatId);
        }

        return updatedChats;
      });
    };

    socket.on('new-message-notification', handleNewMessage);

    return () => {
      socket.off('new-message-notification', handleNewMessage);
    };
  }, [socket, unreadChatIds, user?.id, setChats, addUnreadChatId]);
};

export default useNotifications;
