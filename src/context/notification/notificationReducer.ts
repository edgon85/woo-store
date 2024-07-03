import { INotification } from '@/interfaces';
import { NotificationState } from './NotificationProvider';

export type NotificationActionType =
  | { type: '[Notification] - SET_NOTIFICATIONS'; payload: INotification[] }
  | { type: '[Notification] - ADD_NOTIFICATION'; payload: INotification }
  | { type: '[Notification] - MARK_AS_READ'; payload: string }
  | { type: '[Notification] - REMOVE_NOTIFICATION'; payload: string };

export const notificationReducer = (
  state: NotificationState,
  action: NotificationActionType
): NotificationState => {
  switch (action.type) {
    case '[Notification] - SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload,
      };

    case '[Notification] - ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };

    case '[Notification] - MARK_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        ),
      };

    case '[Notification] - REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };

    default:
      return state;
  }
};
