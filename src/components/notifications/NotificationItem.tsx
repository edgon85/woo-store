import { INotification } from '@/interfaces';
import { formatDateToLocal } from '@/utils';
import Link from 'next/link';

type Props = {
  notification: INotification;
};

export const NotificationItem = ({ notification }: Props) => {
  return (
    <Link
      key={notification.id}
      href={`/product/${notification.url}`}
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
