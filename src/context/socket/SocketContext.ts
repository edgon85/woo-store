import { createContext } from 'react';
import { useSocket } from '../../hooks';

interface SocketContextProps {
  socket: ReturnType<typeof useSocket>['socket'];
  online: boolean;
}

export const SocketContext = createContext<SocketContextProps>(
  {} as SocketContextProps
);
