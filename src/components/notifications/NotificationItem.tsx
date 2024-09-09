import { INotification, NotificationType } from '@/interfaces';
import { formatDateToLocal } from '@/utils';
import Link from 'next/link';

type Props = {
  notification: INotification;
};

export const NotificationItem = ({ notification }: Props) => {
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
  return (
    <Link
      key={notification.id}
      href={`${getRedirectUrl(notification)}`}
      className="bg-white p-1 hover:bg-cerise-red-300 group"
    >
      <p className="text-gray-500 group-hover:text-white">
        {notification.message}
      </p>
      <span className="text-xs text-gray-400 group-hover:text-white">
        {formatDateToLocal(notification.createdAt)}
      </span>
    </Link>
  );
};
