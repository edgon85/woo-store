import { FC, useReducer } from 'react';
import { INotification } from '@/interfaces';
import { notificationReducer } from './notificationReducer';
import { NotificationContext } from './NotificationContext';

export interface NotificationState {
  notifications: INotification[];
}

const NOTIFICATION_INITIAL_STATE: NotificationState = {
  notifications: [],
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const NotificationProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    notificationReducer,
    NOTIFICATION_INITIAL_STATE
  );

  return (
    <NotificationContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
