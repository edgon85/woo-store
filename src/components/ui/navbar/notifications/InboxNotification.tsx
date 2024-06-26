import { ChatContext, SocketContext } from '@/context';
import { useAuth } from '@/hooks';
import useNotifications from '@/hooks/useInbox';
import { useInboxStore } from '@/stores';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { CiMail } from 'react-icons/ci';

export const InboxNotification = () => {
  const { socket } = useContext(SocketContext);
  const { dispatch } = useContext(ChatContext);
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const { unreadCount } = useInboxStore();

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
