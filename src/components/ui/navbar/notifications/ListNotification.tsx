import { INotification, NotificationType } from '@/interfaces';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useContext } from 'react';
import { SocketContext } from '@/context';

type Props = {
  notification: INotification;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
};

export const ListNotification = ({ notification, setIsCollapsed }: Props) => {
  const router = useRouter();
  const { markNotificationAsRead } = useContext(SocketContext);

  const getRedirectUrl = (notification: INotification) => {
    switch (notification.type) {
      case NotificationType.MESSAGE:
        return '/messages';
      case NotificationType.SALE:
        return '/sales';
      case NotificationType.NEW_OFFER:
        return '/offers';
      case NotificationType.ACCEPT_OFFER:
        return `/product/${notification.url}`;
      case NotificationType.REJECT_OFFER:
        return `/product/${notification.url}?offer_rejected=true`;
      case NotificationType.OTHER:
      default:
        return '/notifications';
    }
  };

  const onHandleClick = async () => {
    markNotificationAsRead(notification.id);
    setIsCollapsed(false);
    const redirectUrl = getRedirectUrl(notification);
    router.push(redirectUrl);
    // router.push(`/product/${notification.url}`);
  };
  return (
    <li>
      <button
        onClick={onHandleClick}
        className={`flex items-center justify-between w-full p-2
            ${
              notification.read ? 'bg-white' : 'bg-gray-100'
            }, hover:bg-gray-100`}
      >
        <span>{notification.message}</span>
      </button>
    </li>
  );
};
