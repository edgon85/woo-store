import { createContext } from 'react';
import { useSocket } from '../../hooks';

interface SocketContextProps {
  socket: ReturnType<typeof useSocket>['socket'];
  online: boolean;
  markNotificationAsRead: (notificationId: string) => void;
}

export const SocketContext = createContext<SocketContextProps>(
  {} as SocketContextProps
);
