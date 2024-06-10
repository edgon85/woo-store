import { useReducer } from 'react';
import { ChatContext } from './ChatContext';
import { IMessage } from '@/interfaces';
import { chatReducer } from './chatReducer';

export interface ChatState {
  uid: string;
  // activeChat: null | string;
  activeChat: null | { senderId: string; recipientId: string };
  users: any[];
  messages: IMessage[];
}

const CHAT_INITIAL_STATE: ChatState = {
  uid: '',
  activeChat: null,
  users: [],
  messages: [],
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const ChatProvider = ({ children }: Props) => {
  const [chatState, dispatch] = useReducer(chatReducer, CHAT_INITIAL_STATE);

  return (
    <ChatContext.Provider
      value={{
        chatState,
        dispatch,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
