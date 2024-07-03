import { INotification } from '@/interfaces';
import { NotificationItem } from './NotificationItem';

type Props = {
  notifications: INotification[];
};

export const NotificationList = ({ notifications }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-1 mt-2">
      {notifications.map((notification: INotification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
};
