import { getInboxChats } from '@/actions';
import { SocketContext } from '@/context';
import { useAuth } from '@/hooks';
import { INotification } from '@/interfaces';
import { useContext, useEffect, useState } from 'react';
import { CiMail } from 'react-icons/ci';

export const InboxNotification = () => {
  const { socket } = useContext(SocketContext);
  const { isLoggedIn, user } = useAuth();

  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [unreadChatIds, setUnreadChatIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isLoggedIn) return;

    try {
      const fetchNotifications = async () => {
        const { data } = await getInboxChats();

        setNotifications(data);
        setUnreadCount(
          data.filter(
            (chat: any) =>
              chat.senderRead === false || chat.recipientRead === false
          ).length
        );
        const initialUnreadChats = data
          .filter((chat: any) => !chat.senderRead || !chat.recipientRead)
          .map((chat: any) => chat.id);

        setUnreadChatIds(new Set(initialUnreadChats));
      };

      fetchNotifications();
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  }, [socket, isLoggedIn, user?.id]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage: any) => {
      setNotifications((prevChats: any) => {
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

        // Verificar si el chat del nuevo mensaje ya está en el conjunto de chats no leídos
        const chatAlreadyUnread = unreadChatIds.has(newMessage.chatId);

        if (!chatAlreadyUnread) {
          setUnreadChatIds((prevUnreadChatIds) => {
            const newUnreadChatIds = new Set(prevUnreadChatIds);
            newUnreadChatIds.add(newMessage.chatId);
            setUnreadCount(newUnreadChatIds.size);
            return newUnreadChatIds;
          });
        }

        return updatedChats;
      });
    };

    socket.on('new-message-notification', handleNewMessage);

    return () => {
      socket.off('new-message-notification', handleNewMessage);
    };
  }, [socket, unreadChatIds, user?.id]);

  return (
    <>
      {!isLoggedIn ? null : (
        <div className="relative bg-gray-200 hover:bg-gray-300 text-black font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
          <CiMail size={24} className="font-bold" />
          <span className="w-4 h-4 absolute top-0 right-0 rounded-full bg-cerise-red-500 text-white z-10 text-xs">
            {unreadCount}
          </span>
        </div>
      )}
    </>
  );
};
