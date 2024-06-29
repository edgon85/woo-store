import { createContext } from 'react';
import { useSocket } from '../../hooks';
import { INotification } from '@/interfaces';

interface SocketContextProps {
  socket: ReturnType<typeof useSocket>['socket'];
  online: boolean;
  notifications: INotification[];
  markNotificationAsRead: (notificationId: string) => void;
}

export const SocketContext = createContext<SocketContextProps>(
  {} as SocketContextProps
);
