import { INotification, NotificationType } from '@/interfaces';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useContext } from 'react';
import { SocketContext } from '@/context';
import { formatDateChat } from '@/utils';

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
        return `/product/${notification.url}`;
      case NotificationType.SALE:
        return `/settings/transactions/sales/${notification.url}/detail`;
      case NotificationType.NEW_OFFER:
        return '/settings/offers';
      case NotificationType.ACCEPT_OFFER:
        return `/product/${notification.url}`;
      case NotificationType.REJECT_OFFER:
        return `/product/${notification.url}?offer_rejected=true`;
      case NotificationType.OTHER:
      default:
        return '/settings/notifications';
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
    <button
      onClick={onHandleClick}
      className="flex py-3 px-4 border-b hover:bg-gray-100 "
    >
      <div className="pl-3 w-full">
        <div className="text-gray-500 font-normal text-sm text-start mb-1.5 ">
          {notification.message}
        </div>
        <div className="text-xs font-medium text-primary-700 text-start">
          {formatDateChat(notification.createdAt)}
        </div>
      </div>
    </button>
  );
};
/* 
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

*/
