import { useEffect, useRef, useState } from 'react';
import { Manager, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';
import { IMessages } from '@/interfaces';
import { useInboxStore } from '@/stores';

const useWebSocket = () => {
  const myToken = Cookies.get('token') || '';

  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const socketRef = useRef<Socket | null>(null);
  const { addMessage } = useInboxStore();

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

      addMessage(payload.id, {
        id: payload.id, // You should include a unique identifier for the message
        content: payload.content,
        senderId: payload.senderId,
        timestamp: payload.timestamp,
        recipientId: payload.recipientId,
      });

      // setMessages((prevMessages) => [...prevMessages, payload]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message-from-server');
      socket.close();
    };
  };

  const sendMessage = (content: string, recipientId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('message-from-client', {
        content,
        recipientId,
      });
    }
  };

  return {
    connect,
    connectionStatus,
    sendMessage,
  };
};

export default useWebSocket;
