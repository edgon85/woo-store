import { useContext, useEffect } from 'react';
import { SocketContext } from './SocketContext';
import { useSocket } from '../../hooks';
import { ChatContext } from '../chat/ChatContext';
import { INotification } from '@/interfaces';
import { NotificationContext } from '../notification/NotificationContext';
import { useAuthStore } from '@/stores';

interface SocketProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const { socket, online, conectarSocket, desconectarSocket } = useSocket(
    process.env.API_BASE_URL!
  );
  const { isLoggedIn } = useAuthStore( (state) => state);
  const { dispatch } = useContext(ChatContext);
  const { dispatch: notificationDispatch } = useContext(NotificationContext);

  useEffect(() => {
    if (isLoggedIn) {
      conectarSocket();
    }
  }, [isLoggedIn, conectarSocket]);

  useEffect(() => {
    if (!isLoggedIn) {
      desconectarSocket();
    }
  }, [isLoggedIn, desconectarSocket]);

  // escuchar los cambios de los usuarios conectados
  useEffect(() => {
    socket?.on('lista-usuarios', (usuarios) => {
      dispatch({
        type: '[Chat] - cargar-usuarios',
        payload: usuarios,
      });
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on('message-from-server', (mensaje) => {
      // console.log(mensaje);
      dispatch({
        type: '[Chat] - nuevo-mensaje',
        payload: mensaje,
      });
    });
  }, [socket, dispatch]);

  // Nuevos efectos para manejar notificaciones

  useEffect(() => {
    socket?.on(
      'unread-notifications',
      (unreadNotifications: INotification[]) => {
        notificationDispatch({
          type: '[Notification] - SET_NOTIFICATIONS',
          payload: unreadNotifications,
        });
      }
    );
    return () => {
      socket?.off('unread-notifications');
    };
  }, [socket, notificationDispatch]);

  useEffect(() => {
    socket?.on('new-notification', (notification: INotification) => {
      // console.log('Nueva notificación recibida:', notification);
      notificationDispatch({
        type: '[Notification] - ADD_NOTIFICATION',
        payload: notification,
      });
    });
    return () => {
      socket?.off('new-notification');
    };
  }, [socket, notificationDispatch]);

  useEffect(() => {
    socket?.on('notification-marked-as-read', (notificationId: string) => {
      notificationDispatch({
        type: '[Notification] - REMOVE_NOTIFICATION',
        payload: notificationId,
      });
    });
    return () => {
      socket?.off('notification-marked-as-read');
    };
  }, [socket, notificationDispatch]);

  const markNotificationAsRead = (notificationId: string) => {
    socket?.emit('mark-notification-as-read', { notificationId });
    notificationDispatch({
      type: '[Notification] - MARK_AS_READ',
      payload: notificationId,
    });
  };

  return (
    <SocketContext.Provider value={{ socket, online, markNotificationAsRead }}>
      {children}
    </SocketContext.Provider>
  );
};
