import Cookies from 'js-cookie';
import { useCallback, useEffect, useState } from 'react';
import { Manager, Socket } from 'socket.io-client';

interface UseSocketReturn {
  socket: Socket | null;
  online: boolean;
  conectarSocket: () => void;
  desconectarSocket: () => void;
}

export const useSocket = (serverPath: string): UseSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [online, setOnline] = useState(false);

  const conectarSocket = useCallback(() => {
    const token = Cookies.get('token') || '';

    /* const manager = new Manager(serverPath, {
      transports: ['websocket'],
      autoConnect: false,
      forceNew: true,
      query: {
        'x-token': token,
      },
    }); */
    const manager = new Manager(serverPath, {
      extraHeaders: {
        authentication: token,
      },
    });

    const socketTemp = manager.socket('/');
    socketTemp.connect();
    setSocket(socketTemp);
  }, [serverPath]);

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
