import { useCallback, useRef, useState } from 'react';
import { Manager, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';
import { IMessages } from '@/interfaces';

// const useWebSocket = (url: string) => {
const useWebSocket = () => {
  const myToken = Cookies.get('token') || '';

  const [messages, setMessages] = useState<IMessages[]>([]);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const socketRef = useRef<Socket | null>(null);

  const connect = () => {
    const manager = new Manager(process.env.API_BASE_URL!, {
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

    socketRef.current.on('message-from-server', (payload: IMessages) => {
      console.log(payload);
      setMessages((prevMessages) => [...prevMessages, payload]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message-from-server');
      socket.close();
    };
  };

  const sendMessage = useCallback((content: string, recipientId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('message-from-client', {
        content,
        recipientId,
      });
    }
  }, []);

  /*  const sendMessage = (content: string, recipientId: string) => {
    console.log(content, recipientId);
    if (socketRef.current) {
      socketRef.current.emit('message-from-client', {
        content,
        recipientId,
      });
    }
  }; */

  return {
    connect,
    connectionStatus,
    sendMessage,
    messages,
  };
};

export default useWebSocket;
