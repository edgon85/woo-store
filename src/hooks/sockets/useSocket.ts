import { useCallback, useEffect, useState } from 'react';
import { Manager, Socket } from 'socket.io-client';
import { useAuth } from '../useAuth';

interface UseSocketReturn {
  socket: Socket | null;
  online: boolean;
  conectarSocket: () => void;
  desconectarSocket: () => void;
}

export const useSocket = (serverPath: string): UseSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [online, setOnline] = useState(false);
  const { user } = useAuth();

  const conectarSocket = useCallback(() => {
    const token = user?.token || '';

    const manager = new Manager(serverPath, {
      extraHeaders: {
        authentication: token,
      },
    });

    const socketTemp = manager.socket('/');
    socketTemp.connect();
    setSocket(socketTemp);
  }, [serverPath, user?.token]);

  const desconectarSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  useEffect(() => {
    setOnline(socket?.connected || false);
  }, [socket]);

  useEffect(() => {
    socket?.on('connect', () => setOnline(true));
    return () => {
      socket?.off('connect');
    };
  }, [socket]);

  useEffect(() => {
    socket?.on('disconnect', () => setOnline(false));
    return () => {
      socket?.off('disconnect');
    };
  }, [socket]);

  return {
    socket,
    online,
    conectarSocket,
    desconectarSocket,
  };
};
