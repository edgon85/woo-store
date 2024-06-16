import { useContext, useEffect } from 'react';
import { SocketContext } from './SocketContext';
import { useSocket } from '../../hooks';
import { AuthContext } from '../auth';
import { ChatContext } from '../chat/ChatContext';

interface SocketProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const { socket, online, conectarSocket, desconectarSocket } = useSocket(
    process.env.API_BASE_URL!
  );
  const { isLoggedIn } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

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

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
