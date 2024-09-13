import { IChatProduct, IMessage } from '@/interfaces';
import { ChatState } from './ChatProvider';

type ChatActionType =
  | { type: '[Chat] - cargar-usuarios'; payload: any }
  | { type: '[Chat] - activar-chat'; payload: string }
  | { type: '[Chat] - SET_PROD'; payload: IChatProduct }
  | { type: '[Chat] - nuevo-mensaje'; payload: IMessage }
  | { type: '[Chat] - cargar-mensajes'; payload: IMessage[] }
  | { type: '[Chat] - cerrar-sesión' }
  | { type: '[Chat] - SET_UID'; payload: string }
  | { type: '[Chat] - DELETE_CHAT_ACTIVE' };

export const chatReducer = (
  state: ChatState,
  action: ChatActionType
): ChatState => {
  switch (action.type) {
    case '[Chat] - SET_UID':
      return {
        ...state,
        uid: action.payload,
      };
    case '[Chat] - cargar-usuarios':
      return {
        ...state,
        users: [...action.payload],
      };

    case '[Chat] - activar-chat':
      if (state.activeChat === action.payload) return state;

      return {
        ...state,
        activeChat: action.payload,
        messages: [],
      };

    case '[Chat] - nuevo-mensaje':
      if (
        state.uid === action.payload.from ||
        state.uid === action.payload.to
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
        product: null,
        activeChat: null,
        users: [],
        messages: [],
      };

    case '[Chat] - SET_PROD':
      return {
        ...state,
        product: action.payload,
      };

    case '[Chat] - DELETE_CHAT_ACTIVE':
      return {
        ...state,
        activeChat: null,
        product: null,
        messages: [],
      };

    default:
      return state;
  }
};
