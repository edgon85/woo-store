import { useCallback, useEffect, useRef, useState } from 'react';
import { Manager, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';

export interface IMessages {
  fullName: string;
  message: string;
}

const useWebSocket = (url: string) => {
  const myToken = Cookies.get('token') || '';

  const [messages, setMessages] = useState<IMessages[]>([]);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  // const [clients, setClients] = useState<string[]>([] as string[]);
  const socketRef = useRef<Socket | null>(null);

  const connect = useCallback(() => {
    const manager = new Manager(url, {
      extraHeaders: {
        authentication: myToken,
      },
    });
    const socket = manager.socket('/');
    socketRef.current = socket;

    socket.on('connect', () => {
      setConnectionStatus('connected');
    });

    socket.on('disconnect', () => {
      setConnectionStatus('disconnected');
    });

    /*  socket.on('clients-updated', (clients: string[]) => {
      setClients(clients);
    }); */

    socketRef.current.on('message-from-server', (payload: IMessages) => {
      console.log(payload);
      setMessages((prevMessages) => [...prevMessages, payload]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('clients-updated');
      socket.off('message-from-server');
      socket.close();
    };
  }, [myToken, url]);

  const sendMessage = (message: string) => {
    if (socketRef.current) {
      socketRef.current.emit('message-from-client', {
        message,
      });
    }
  };

  return {
    connect,
    connectionStatus,
    sendMessage,
    messages,
  };
};

export default useWebSocket;
