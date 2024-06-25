import { getInboxChats } from '@/actions';
import { ChatContext, SocketContext } from '@/context';
import { useAuth } from '@/hooks';
import useNotifications from '@/hooks/useInbox';
import { useInboxStore } from '@/stores';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { CiMail } from 'react-icons/ci';

export const InboxNotification = () => {
  const { socket } = useContext(SocketContext);
  const { dispatch } = useContext(ChatContext);
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();

  const { unreadCount, unreadChatIds, setChats, addUnreadChatId } =
    useInboxStore();

  useNotifications(socket);

  const onHandleClick = async () => {
    router.push('/inbox');
    dispatch({ type: '[Chat] - DELETE_CHAT_ACTIVE' });
  };

  return (
    <>
      {!isLoggedIn ? null : (
        <button
          onClick={onHandleClick}
          className="relative bg-gray-200 hover:bg-gray-300 text-black font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
        >
          <CiMail size={24} className="font-bold" />
          {unreadCount > 0 ? (
            <span className="w-4 h-4 absolute top-0 right-0 rounded-full bg-cerise-red-500 text-white z-10 text-xs">
              {unreadCount}
            </span>
          ) : null}
        </button>
      )}
    </>
  );
};

/*   useEffect(() => {
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
      setChats((prevChats) => {
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
  }, [socket, unreadChatIds, user?.id, setChats, addUnreadChatId]); */
