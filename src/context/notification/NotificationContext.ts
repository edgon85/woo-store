import { createContext } from 'react';
import { NotificationState } from './NotificationProvider';
import { NotificationActionType } from './notificationReducer';

type ContextProps = {
  state: NotificationState;
  dispatch: React.Dispatch<NotificationActionType>;
};

export const NotificationContext = createContext<ContextProps>(
  {} as ContextProps
);
