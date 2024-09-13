import { Dispatch, createContext } from 'react';
import { ChatState } from './ChatProvider';

type ContextProps = {
  chatState: ChatState;
  dispatch: Dispatch<any>;
};

export const ChatContext = createContext<ContextProps>({} as ContextProps);
