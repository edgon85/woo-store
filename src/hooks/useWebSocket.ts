import { useEffect, useRef, useState } from 'react';
import { Manager, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';
import { useInboxStore } from '@/stores';
import { IMessage } from '@/interfaces';

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

    socketRef.current.on('message-from-server', (payload: IMessage) => {
      console.log('Message received from server:', payload);

      addMessage(payload.id!, {
        id: payload.id,
        content: payload.message,
        senderId: payload.from,
        recipientId: payload.to,
        timestamp: ''
      });
    });
    // setMessages((prevMessages) => [...prevMessages, payload]);

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message-from-server');
      socket.close();
    };
  };

  const sendMessage = (content: string, recipientId: string) => {
    return new Promise((resolve, reject) => {
      if (socketRef.current) {
        socketRef.current.emit(
          'message-from-client',
          { content, recipientId },
          (response: any) => {
            if (response.status === 'success') {
              resolve(response);
            } else {
              reject(new Error(response.message));
            }
          }
        );
      } else {
        reject(new Error('Socket is not connected'));
      }
    });
  };
  /*  const sendMessage = (content: string, recipientId: string) => {
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
  };
};

export default useWebSocket;
