import { getNotifications } from '@/actions';
import { SocketContext } from '@/context';
import { useAuth } from '@/hooks';
import { INotification } from '@/interfaces';
import { useContext, useEffect, useState } from 'react';
import { CiMail } from 'react-icons/ci';

export const InboxNotification = () => {
  const { socket } = useContext(SocketContext);
  const { isLoggedIn } = useAuth();

  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!isLoggedIn) return;
    // Listen for new message notifications
    const fetchNotifications = async () => {
      const { data } = await getNotifications();
      setNotifications(data);
      setUnreadCount(
        data.filter((notification: INotification) => !notification.read).length
      );
    };

    fetchNotifications();

    socket?.on('new-message-notification', (newMessage) => {
      setNotifications((prevNotifications) => [
        newMessage,
        ...prevNotifications,
      ]);
      setUnreadCount((prevCount) => prevCount + 1);
    });

    // Clean up on component unmount
    return () => {
      socket?.off('new-message-notification');
    };
  }, [socket, isLoggedIn]);

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
