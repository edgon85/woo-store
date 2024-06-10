import { IMessage } from '@/interfaces';
import { ChatState } from './ChatProvider';

type ChatActionType =
  | { type: '[Chat] - cargar-usuarios'; payload: any }
  | { type: '[Chat] - activar-chat'; payload: { senderId: string; recipientId: string } }
  | { type: '[Chat] - nuevo-mensaje'; payload: IMessage }
  | { type: '[Chat] - cargar-mensajes'; payload: IMessage[] }
  | { type: '[Chat] - cerrar-sesión' };

export const chatReducer = (
  state: ChatState,
  action: ChatActionType
): ChatState => {
  switch (action.type) {
    case '[Chat] - cargar-usuarios':
      return {
        ...state,
        users: [...action.payload],
      };

    case '[Chat] - activar-chat':
      if (state.activeChat === action.payload) return state;

      return {
        ...state,
        activeChat: { senderId: action.payload.senderId, recipientId: action.payload.recipientId},
        messages: [],
      };

    case '[Chat] - nuevo-mensaje':
      if (
        state.activeChat?.senderId === action.payload.from ||
        state.activeChat?.recipientId === action.payload.to
      ) {
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      } else {
        return state;
      }

    case '[Chat] - cargar-mensajes':
      return {
        ...state,
        messages: [...action.payload],
      };

    case '[Chat] - cerrar-sesión':
      return {
        uid: '',
        activeChat: null,
        users: [],
        messages: [],
      };

    default:
      return state;
  }
};
