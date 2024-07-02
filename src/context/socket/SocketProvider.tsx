import { useContext, useEffect, useState } from "react";
import { SocketContext } from "./SocketContext";
import { useSocket } from "../../hooks";
import { AuthContext } from "../auth";
import { ChatContext } from "../chat/ChatContext";
import { INotification } from "@/interfaces";

interface SocketProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const { socket, online, conectarSocket, desconectarSocket } = useSocket(
    process.env.API_BASE_URL!
  );
  const { isLoggedIn } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);


  // TODO: Add notifications state context
  const [notifications, setNotifications] = useState<INotification[]>([]);

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
    socket?.on("lista-usuarios", (usuarios) => {
      dispatch({
        type: "[Chat] - cargar-usuarios",
        payload: usuarios,
      });
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("message-from-server", (mensaje) => {
      // console.log(mensaje);
      dispatch({
        type: "[Chat] - nuevo-mensaje",
        payload: mensaje,
      });
    });
  }, [socket, dispatch]);

  // Nuevos efectos para manejar notificaciones
  useEffect(() => {
    // if (!socket) return;

    socket?.on(
      "unread-notifications",
      (unreadNotifications: INotification[]) => {
        setNotifications(unreadNotifications);
      }
    );
    // new-notification
    socket?.on("new-notification", (notification: INotification) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ]);
    });

    socket?.on("notification-marked-as-read", (notificationId: string) => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification: INotification) => notification.id !== notificationId
        )
      );
    });

    return () => {
      socket?.off("unread-notifications");
      socket?.off("new-notification");
      socket?.off("notification-marked-as-read");
    };
  }, [socket]);

  const markNotificationAsRead = (notificationId: string) => {
    socket?.emit("mark-notification-as-read", { notificationId });
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== notificationId
      )
    );
  };

  return (
    <SocketContext.Provider
      value={{ socket, online, notifications, markNotificationAsRead }}
    >
      {children}
    </SocketContext.Provider>
  );
};
